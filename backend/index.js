import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";

import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import shopRouter from './routes/shopRoutes.js';
import itemRouter from './routes/itemRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors({
    origin:"http://localhost:5173",  // fronend request
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);


app.get("/", (req, res)=>{
    res.send("Hello From Server");
});

app.listen(port, (err)=>{
    if(err){
        console.log("Unable to connect to the server");
    }
    console.log(`Server is running at http://localhost:${port}`);
    connectDB();
})


