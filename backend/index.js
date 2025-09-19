import express from 'express';
import dotenv from 'dotenv';
import connextDB from './config/db.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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


