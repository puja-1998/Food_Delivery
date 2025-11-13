import jwt from 'jsonwebtoken';
import React from 'react'

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({message:"token not found"})
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
    if(!decodeToken){
        return res.status(400).json({message:"token not Verify"})
    }
    console.log(decodeToken)
    req.userId = decodeToken.userId
    next();
  } catch (error) {
    return res.status(500).json({message:"is Auth Middleware Error"})
  }
}

export default isAuth