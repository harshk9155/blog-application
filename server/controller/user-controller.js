import User from '../model/user.js';

import bcrypt from 'bcryptjs';

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

export const loginUser = async (request,response) => {
  let user= await user.findone({username: request.body.username});
  if(!user){
    return response.status(400).json({message:'user not found'});
  }
}
