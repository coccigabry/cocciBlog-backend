import 'dotenv/config'
import { db } from '../../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const registerCtrl = (req, res) => {
    //check existing user
    const query = 'SELECT * FROM users WHERE email = ? OR username = ?'
    db.query(
        query,
        [req.body.email, req.body.username],
        (err, data) => {
            if (err) throw err
            if (data.length) return res.status(409).json('User already exists!')
            //Hash password and create user
            try {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(req.body.password, salt)
                const query = 'INSERT INTO users (username, email, password) VALUES (?)'
                const values = [
                    req.body.username,
                    req.body.email,
                    hash
                ]
                db.query(
                    query,
                    [values],
                    (err, data) => {
                        if (err) throw err
                        return res.status(200).json(`User has been created! ${data}`)
                    }
                )
            } catch (err) {
                res.status(500).json(err)
            }
        }
    )
}


export const loginCtrl = (req, res) => {
    try {
        //check existing user
        const query = 'SELECT * FROM users WHERE username = ?'
        db.query(
            query,
            [req.body.username],
            (err, data) => {
                if (err) return res.status(500).json(err)
                if (data.length === 0) return res.status(404).json('User not found!')
                //check password
                const isPswCorrect = bcrypt.compareSync(req.body.password, data[0].password)
                if (!isPswCorrect) return res.status(400).json('Wrong credentials!')
                //set jwt
                const { password, ...other } = data[0]
                const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY, { expiresIn: '1d' })
                res.status(200).json({ other, token })
            }
        )
    } catch (err) {
        res.status(500).json(err)
    }
}


export const logoutCtrl = (req, res) => {
    res.clearCookie('access_token', {
        sameSite: 'none',
        secure: true
    }).status(200).json('User has been logged out')
}