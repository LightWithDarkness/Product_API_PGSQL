// import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { customError } from '../utils/custom.error.js';
import client from '../config/db.js';

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exist
    const existingUser = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    if (existingUser.rows.length > 0) {
      return next(customError(400, 'User already exist same email'));
    }
    //saving the user
    const hashedPassword = await bcryptjs.hash(password, 12);
    const result = await client.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    return res
      .status(201)
      .json({
        success: true,
        message: 'User Created Successfully',
        user: result.rows[0],
      });
  } catch (error) {
    return next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password: pass } = req.body;
  try {
    // await client.connect();
    const existingUser = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    if (existingUser.rows.length === 0) {
      return next(customError(404, 'User not found'));
    }
    //check password
    const foundUser = existingUser.rows[0];
    const isPasswordValid = await bcryptjs.compare(pass, foundUser.password);
    if (!isPasswordValid) {
      return next(customError(401, 'Invalid Credentials'));
    }
    //generate token
    const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET);
    const { password, ...userDetails } = foundUser;
    //response
    return res
      .cookie('access_token', token, { httpOnly: true, maxAge: 3600000 })
      .status(200)
      .json({
        success: true,
        message: 'User Logged In Successfully',
        user: userDetails,
      });
  } catch (error) {
    return next(error);
  } 
//   finally {
//     await client.end();
//   }
};

const signOut = async (req, res, next) => {};

export { signUp, signIn, signOut };
