import jwt from 'jsonwebtoken';
import { customError } from '../utils/custom.error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(customError(401, 'Unauthorized'));
    }
    //verify token
    jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
        if(err) return customError(401, 'Unauthorized');
        req.user = decoded;
        next();
    });
}
