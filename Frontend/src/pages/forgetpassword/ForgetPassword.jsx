import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../API/axiosInstance";
import ROUTES from "../../constants/routes";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [dis, setDis] = useState(true);
  const [isUser, setIsUser] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
    OTP: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    for (let val in formData) {
      if (formData[val] === "") {
        setDis(false);
        return;
      }
    }
    setDis(true);
  }, [formData]);

  const { email, password, rePassword, OTP } = formData;

  const sendOTP = async () => {
    try {
      const isUser = await axiosInstance.post("/verify-email", {
        email: email,
      });

      toast.success("OTP sent to user email.");
      setStatus(true);
    } catch (error) {
      if (error.response.status === 409) {
        toast.warn("User not found");
        navigate(ROUTES.REGISTER);
        return;
      }
      console.log(error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const verify_otp = await axiosInstance.post("/verify-otp", {
        email: email,
        OTP: OTP,
      });
      if (verify_otp.status === 200) {
        setIsUser(false);
        toast.success("OTP verified");
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning("Password is mismatched");
      }
    }
  };

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      const resetData = {
        email: formData.email,
        password: formData.password,
        rePassword: formData.rePassword,
      };
      const result = await axiosInstance.post("/resetpassword", resetData);
      toast.success("Password changed successfully");
      navigate(ROUTES.LOGIN);
      setFormData({
        email: "",
        password: "",
        rePassword: "",
        OTP: "",
      });
    } catch (error) {
      if (!error.response) {
        toast.error("Network error");
        return;
      }
      if (error.response.status === 401) {
        toast.warning("OTP mismatched");
        return;
      }
      if (error.response.status === 409) {
        toast.warning("User not exists");
        return;
      }
      if (error.response.status === 500) {
        toast.warning("Internal server error please try again later");
        return;
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-gray-900">
      <div className="h-auto pt-4 pb-4 w-[550px] rounded-xl flex flex-col justify-center items-center shadow-lg bg-white">
        <h1 className="text-[25px] font-bold">Reset Password</h1>
        <form
          action=""
          onSubmit={handleForm}
          className="h-[80%] w-[90%] flex flex-col justify-evenly gap-3"
        >
          <div>
            <label htmlFor="">Enter Mail Id</label>
            <input
              type="mail"
              placeholder="Enter your mail id"
              className="w-full rounded p-2 border-b-2 outline-none bg-gray-200"
              name="email"
              value={formData.email}
              onChange={handleInput}
            />
          </div>
          <div className="flex gap-5">
            {status && isUser ? (
              <input
                type="number"
                placeholder="Enter OTP"
                className="w-full rounded p-2 border-b-2 outline-none"
                name="OTP"
                value={formData.OTP}
                onChange={handleInput}
              />
            ) : (
              ""
            )}

            {status ? (
              ""
            ) : (
              <button
                type="button"
                onClick={sendOTP}
                className="px-5 bg-blue-600 text-[white] font-mono text-[18px] rounded-[10px]"
              >
                Send
              </button>
            )}
            {status && isUser ? (
              <button
                type="button"
                onClick={verifyOtp}
                className="px-5 bg-blue-600 text-[white] font-mono text-[18px] rounded-[10px]"
              >
                Verify
              </button>
            ) : (
              ""
            )}
          </div>
          {isUser ? (
            ""
          ) : (
            <>
              <div>
                <label htmlFor="">Enter Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full rounded p-2 border-b-2 outline-none"
                  name="password"
                  value={formData.password}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full rounded p-2 border-b-2 outline-none"
                  name="rePassword"
                  value={formData.rePassword}
                  onChange={handleInput}
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className={`bg-blue-600 px-3 py-2 rounded-md text-white font-mono  ${
                    dis ? "cursor-pointer" : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!dis}
                >
                  SUBMIT
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
