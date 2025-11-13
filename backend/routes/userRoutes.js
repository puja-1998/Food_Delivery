import express from 'express';
import { googleAuth, resetPassword, sendOtp, signIn, signOut, signUp, verifiedOtp } from '../controllers/authControlle.js';

const userRouter = express.Router();

userRouter.post("/signup",  signUp);
userRouter.post("/signin",  signIn);
userRouter.get("/signout",  signOut);
userRouter.post("/send-otp",  sendOtp);
userRouter.post("/verify-otp",  verifiedOtp);
userRouter.post("/reset-password",  resetPassword);
userRouter.post("/google-auth",  googleAuth);

export default userRouter;

