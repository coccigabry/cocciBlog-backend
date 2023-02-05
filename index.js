import express from 'express'
import cors from 'cors'

import authRoute from './api/routes/auth.js'
import usersRoute from './api/routes/users.js'
import postsRoute from './api/routes/posts.js'


const app = express()

app.use(cors({ origin: '*'}))
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)


app.listen(4000, () => {
    console.log('Server listening my son!')
})