import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

export const signupUser = async (request, response) => {
    try {
        const existing = await User.findOne({ username: request.body.username });
        if (existing) return response.status(409).json('Username already taken');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);

        const newUser = new User({
            username: request.body.username,
            name: request.body.name,
            password: hashedPassword,
        });

        await newUser.save();
        response.status(200).json('User signed up successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
};

export const loginUser = async (request, response) => {
    try {
        const user = await User.findOne({ username: request.body.username });
        if (!user) return response.status(401).json('Invalid Username');

        const match = await bcrypt.compare(request.body.password, user.password);
        if (!match) return response.status(401).json('Invalid Password');

        const accessToken = jwt.sign(
            { username: user.username, id: user._id },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { username: user.username, id: user._id },
            process.env.REFRESH_SECRET_KEY
        );

        return response.status(200).json({
            accessToken, refreshToken,
            username: user.username,
            name: user.name
        });
    } catch (error) {
        return response.status(500).json(error.message);
    }
};