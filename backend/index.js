import express from 'express';
import dotenv from 'dotenv';
import connextDB from './config/db.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", userRouter);


app.get("/", (req, res)=>{
    res.send("Hello From Server");
});

app.listen(port, (err)=>{
    if(err){
        console.log("Unable to connect to the server");
    }
    console.log(`Server is running at http://localhost:${port}`);
    connextDB();
})


