import React, { useState, ChangeEvent, FormEvent } from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import GetUserByEmail from "../Server/GetUserByEmail";
import bcrypt from "bcryptjs-react";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export const LoginSignup: React.FC = () => {
  const [action, setAction] = useState("Sign Up");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const [activeButton, setActiveButton] = useState<"login" | "signup">("login");
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
  });

  const renderSuccessMessage = () => (
    <div className="success">Successfully login...</div>
  );

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignUp = () => {
    setIsSignUpSuccess(true);
    setIsLoginFormVisible(true);
    navigate("/signup");
    console.log("Sign Up");
  };

  const handleLoginIn = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const userResponse = await GetUserByEmail(loginData.email);
      const hashedPassword = userResponse ? userResponse.password : null;
      if (userResponse) {
        console.log("User Response ", userResponse);
        if (
          hashedPassword &&
          (await bcrypt.compare(loginData.password, hashedPassword))
        ) {
          navigate("./dashboard");
          setLoginData({ email: "", password: "" });
        } else {
          setErrorMessage("Invalid email or password. Please try again.....");
        }
      } else {
        setErrorMessage("User not found. Please sign up.");
      }
    } catch (error) {
      console.error("Login Failed:", error);
      setErrorMessage("Invalid email or password. Please try again.....");
    }
  };

  return (
    <div className="form-container">
      <form>
        <div className="container">
          <div className="header">
            <div className="text">Login</div>
            <div className="underline"></div>
          </div>
          <div style={{ marginBottom: "30px" }}></div>
          <div className="row">
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Email"
                value={loginData.email}
                onChange={handleChange}
                style={{ width: "120%" }}
              />
            </div>
          </div>
          <div style={{ marginBottom: "40px" }}></div>
          <div className="row">
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                name="password"
                autoComplete="off"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="error-message">{errorMessage}</div>
          <div className="submit-container">
            <button
              className={activeButton === "signup" ? "submit" : "submit gray"}
              onClick={() => {
                setActiveButton("signup");
                handleSignUp();
              }}
              disabled={buttonClicked}
            >
              Sign Up
            </button>
            <button
              className={activeButton === "login" ? "submit" : "submit gray"}
              onClick={(event) => {
                setActiveButton("login");
                handleLoginIn(event);
              }}
              disabled={buttonClicked}
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LoginSignup;
