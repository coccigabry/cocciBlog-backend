import { db } from '../../db.js'
import jwt from 'jsonwebtoken'


export const getPostsCtrl = (req, res) => {
    try {
        const query = req.query.cat
            ? 'SELECT * FROM posts WHERE cat=?'
            : 'SELECT * FROM posts'
        db.query(
            query,
            [req.query.cat],
            (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data)
            }
        )
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getPostByIDCtrl = (req, res) => {
    try {
        const query = 'SELECT `username`, users.img AS userImg, `title`, `desc`, posts.img, `cat`, `date` FROM users JOIN posts ON users.id = posts.user_id WHERE posts.id = ?'
        db.query(
            query,
            [req.params.id],
            (err, data) => {
                if (err) return res.status(500).json(err)
                res.status(200).json(data)
            }
        )
    } catch (err) {
        res.status(500).json(err)
    }
}

//export const addPostCtrl = (req, res) => {
//
//}

export const deletePostCtrl = (req, res) => {
    try {
        // check if there is a token
        const token = req.cookies.access_token
        if (!token) return res.status(401).json('You are not authenticated!')
        // check token validity
        jwt.verify(
            token,
            process.env.JWT_KEY,
            (err, userInfo) => {
                if (err) return res.status(403).json('Token not valid!')
                // delete post
                const postId = req.params.id
                const query = 'DELETE FROM posts WHERE id = ? AND user_id = ?'
                db.query(
                    query,
                    [postId, userInfo.id],
                    (err, data) => {
                        if (err) return res.status(403).json('You are not allowed to perfom this action!')
                        return res.status(200).json('Post deleted')
                    }
                )
            }
        )
    } catch (err) {
        res.status(500).json(err)
    }
}

//export const updatePostCtrl = (req, res) => {
//
//}