//@ts-nocheck
import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticateToken = (req, res, next): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Lấy token từ "Bearer token"

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user as JwtPayload;  // Gán user từ token vào req.user
        next();
    });
};
