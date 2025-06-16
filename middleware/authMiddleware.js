import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access token required' });

    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        // assigning user so that we can use into next route
        req.user = user;
        next();
    });
};

export const authenticateRefreshToken = (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' })

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: 'Inavlid Refresh Token' })
        // assigning user so that we can use into next route
        req.user = user
        next();
    })
}