import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import user from '../model/user.js';

dotenv.config();


export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return response.status(401).json({ msg: "Token not provided" });
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            return response.status(403).json({ msg: "Invalid token" });
        }

        request.user = user;
        next();
    });
};