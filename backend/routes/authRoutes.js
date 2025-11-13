import express from 'express';
import { googleAuth, resetPassword, sendOtp, signIn, signOut, signUp, verifiedOtp } from '../controllers/authControlle.js';

const authRouter = express.Router();

authRouter.post("/signup",  signUp);
authRouter.post("/signin",  signIn);
authRouter.get("/signout",  signOut);
authRouter.post("/send-otp",  sendOtp);
authRouter.post("/verify-otp",  verifiedOtp);
authRouter.post("/reset-password",  resetPassword);
authRouter.post("/google-auth",  googleAuth);

export default authRouter;

