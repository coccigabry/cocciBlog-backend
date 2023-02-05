import express from 'express'
import cors from 'cors'
import multer from 'multer'

import authRoute from './api/routes/auth.js'
import usersRoute from './api/routes/users.js'
import postsRoute from './api/routes/posts.js'


const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename)
})


app.listen(4000, () => {
    console.log('Server listening my son!')
})