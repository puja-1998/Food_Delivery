import React, { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setErr("");
      setStep(2);
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleVerifiedOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setErr("");
      setStep(3);
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    if (newPassword != confirmPassword) {
      return null;
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      console.log(result);
      setErr("");
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full p-8 max-w-md">
        <div className="flex items-center gap-4 mb-4">
          <IoArrowBackOutline
            size={30}
            className="text-[#ff4d2d]"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {/* Send OTP */}
        {step == 1 && (
          <div>
            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                required
                type="email"
                placeholder="Enter Your Email"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className={`w-full font-semibold rounded-lg  py-2 transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
              onClick={handleSendOtp} disabled={loading}
            >
              {loading?<ClipLoader size={20} color="white"/>:"Send OTP"}
            </button>
            {err && (
              <p className="text-red-500 text-center my-[10px]">*{err}</p>
            )}
          </div>
        )}

        {/* Verify OTP */}
        {step == 2 && (
          <div>
            {/* otp */}
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                {" "}
                OTP
              </label>
              <input
                required
                type="text"
                placeholder="Enter OTP"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button
              className={`w-full font-semibold rounded-lg  py-2 transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
              onClick={handleVerifiedOtp}
            disabled={loading}
            >
              {loading?<ClipLoader size={20} color="white"/>:"Verify OTP"}
            </button>
            {err && (
              <p className="text-red-500 text-center my-[10px]">*{err}</p>
            )}
          </div>
        )}

        {/*  */}
        {step == 3 && (
          <div>
            {/* Reset Password */}
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                {" "}
                New Password
              </label>
              <input
                required
                type="text"
                placeholder="Enter New Password"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                {" "}
                Confirm Password
              </label>
              <input
                required
                type="text"
                placeholder="Enter Confirm Password"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className={`w-full font-semibold rounded-lg  py-2 transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
              onClick={handleResetPassword}
            disabled={loading}
            >
              {loading?<ClipLoader size={20} color="white"/>:"Reset Password"}
              
            </button>
            {err && (
              <p className="text-red-500 text-center my-[10px]">*{err}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
