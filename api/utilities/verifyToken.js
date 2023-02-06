import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const headersToken = req.headers.token
    if (!headersToken) return res.status(401).json('You are not authenticated!')
    // check token validity
    const token = headersToken.split(' ')[1]
    jwt.verify(
        token,
        process.env.JWT_KEY,
        (err, userInfo) => {
            if (err) return res.status(403).json('Token not valid!')
            next()
        }
    )
}