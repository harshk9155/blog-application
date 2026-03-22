import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import bcrypt from 'bcryptjs';
import token from '../model/token.js';

dotenv.config();

export const signupUser = async (request, response) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const userData = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    }

    const newUser = new User(userData);

    await newUser.save();

    response.status(200).json('User signed up successfully');
  } catch (error) {
    response.status(500).json(error.message);
  }
};


export const loginUser = async (request, response) => {
  try {
    const user = await User.findOne({ username: request.body.username });

    if (!user) {
      return response.status(401).json('Invalid Username');
    }

    const match = await bcrypt.compare(request.body.password, user.password);

    if (!match) {
      return response.status(401).json('Invalid Password');
    }

    return response.status(200).json({
      accessToken: "dummy",
      refreshToken: "dummy",
      username: user.username,
      name: user.name
    });

  } catch (error) {
    return response.status(500).json(error.message);
  }
};