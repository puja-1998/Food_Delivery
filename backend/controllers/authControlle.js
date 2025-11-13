import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

// signUp Controller
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    let user = await User.findOne({ email });

    // if user Exists
    if (user) return res.status(400).json({ message: "User already Exists!" });

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters." });
    }

    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "Mobile No. must be atleast 10 Digits." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      mobile,
      role,
      password: hashedPassword,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error, "Signup Error");
    return res.status(500).json(`sign up error ${error}`);
  }
};

// signIn Controller
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    // if user Exists
    if (!user)
      return res.status(400).json({ message: "User doen not  Exist!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error, "SignIn Error");
    return res.status(500).json(`sign In error ${error}`);
  }
};

// Logout
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "log out successfully" });
  } catch (error) {
    console.log(error, "SignOut Error");
    return res.status(500).json(`sign Out error ${error}`);
  }
};

// send otp
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exists." });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save();
    await sendOtpMail(email, otp);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error, "OTP Error");
    return res.status(500).json(`send OTP error ${error}`);
  }
};

//verify otp
export const verifiedOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Envalid / Expires OTP." });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();
    return res.status(200).json({ message: "OTP Verify successfully" });
  } catch (error) {
    console.log(error, "OTP Error");
    return res.status(500).json(`Verify OTP error ${error}`);
  }
};

//reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP verificatio required." });
    }
   
    const hashPassword =  await bcrypt.hash(newPassword, 10)
    user.password = hashPassword
    user.isOtpVerified = false

    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error, "OTP Error");
    return res.status(500).json(`Reset Password error ${error}`);
  }
};


// Google Auth Controller
export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile,role} = req.body;
    let user = await User.findOne({ email });

    // if user does not Exists
    if (!user){
        user = await User.create({
            fullName, email, mobile,role
        })
    }


    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(user);

  } catch (error) {
    console.log(error, "Google Auth Error");
    return res.status(500).json(`Google Auth error ${error}`);
  }
};
