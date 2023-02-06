import { db } from '../../db.js'


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
        const query = 'SELECT posts.id, `username`, users.img AS userImg, `title`, `desc`, posts.img, `cat`, `date` FROM users JOIN posts ON users.id = posts.user_id WHERE posts.id = ?'
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

export const addPostCtrl = (req, res) => {
    try {
        const query = 'INSERT INTO posts(`id`, `title`, `desc`, `img`, `date`, `user_id`, `cat`) VALUES (NULL, ?)'
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.date,
            userInfo.id,
            req.body.cat
        ]
        db.query(
            query,
            [values],
            (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json(err)
                }
                return res.status(200).json(data)
            }
        )
    } catch (err) {
        res.status(500).json(err)
    }
}

export const deletePostCtrl = (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json(err)
    }
}

export const updatePostCtrl = (req, res) => {
    try {
        const postId = req.params.id
        const query = 'UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `user_id`=?'
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat
        ]
        db.query(
            query,
            [...values, postId, userInfo.id],
            (err, data) => {
                //if (err) return res.status(500).json(err)
                if (err) console.log(err)
                return res.status(200).json('Post updated')
            }
        )
    } catch (err) {
        res.status(500).json(err)
    }
}