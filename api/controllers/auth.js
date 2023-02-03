import { db } from '../../db.js'
import bcrypt from 'bcryptjs'


export const registerCtrl = (req, res) => {
    //check existing user
    const query = 'SELECT * FROM users WHERE email = ? OR username = ?'
    db.query(
        query,
        [req.body.email, req.body.email],
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
                res.status(500).json(`New error: ${err}`)
            }
        }
    )

}

export const loginCtrl = (req, res) => {

}

export const logoutCtrl = (req, res) => {

}