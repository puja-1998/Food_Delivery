import express from 'express';
import { signIn, signOut, signUp } from '../controllers/authControlle.js';

const userRouter = express.Router();

userRouter.post("/register",  signUp);
userRouter.post("/login",  signIn);
userRouter.get("/logout",  signOut);

export default userRouter;

