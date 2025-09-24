import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import genToken from "../utils/token.js";

// signUp Controller
export const signUp = async (req, res) => {
    try {
        const {fullName, email, password, mobile, role} = req.body;
        const user = await User.findOne({email});

        // if user Exists
        if(user) return res.status(400).json({message:"User already Exists!"});

        if(password.length < 6){
            return res.status(400).json({message:"Password must be atleast 6 characters."});
        }

        if(mobile.length < 10){
            return res.status(400).json({message:"Mobile No. must be atleast 10 Digits."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({fullName, email, mobile, role, password:hashedPassword});

        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        });

        return res.status(201).json(user);
        
    } catch (error) {
        console.log(error, "Signup Error");
       return res.status(500).json(`sign up error ${error}`);
    }
}


// signIn Controller
export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        // if user Exists
        if(!user) return res.status(400).json({message:"User doen not  Exist!"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        });

        return res.status(201).json(user);
        
    } catch (error) {
        console.log(error, "SignIn Error");
       return res.status(500).json(`sign In error ${error}`);
    }
}

// Logout 
export const signOut = async (req, res) => {
    try {
        res.clearCookie("token");
         return res.status(200).json({message:"log out successfully"});
    } catch (error) {
        console.log(error, "SignOut Error");
       return res.status(500).json(`sign Out error ${error}`);
    }
}
