import React, { useState, ChangeEvent, FormEvent } from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const LoginSignup: React.FC = () => {
  const [action, setAction] = useState("Sign Up");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [formValid, setFormValid] = useState(false);

  const renderSuccessMessage = () => (
    <div className="success">Successfully login...</div>
  );
  const navigate = useNavigate();

  const database = [
    {
      username: "Shalu",
      password: "1234",
    },
    {
      username: "Shalika",
      password: "1234",
    },
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    //console.log(`Updated formData: ${JSON.stringify(formData)}`);
    setFormValid(formData.username !== "" && formData.password !== "");
  };

  const handleSignUp = () => {
    //event.preventDefault();
    setIsSignUpSuccess(true);
  };

  const handleLoginIn = () => {
    if (formValid) {
      if (formData.username && formData.password) {
        navigate("./dashboard", { replace: true });
      } else if (formData.username) {
        setErrorMessage("Please enter your Password");
      } else if (formData.password) {
        setErrorMessage("Please enter your Username");
      } else if (formData.username === "" || formData.password === "") {
        setErrorMessage("Please enter your Credentials");
      } else {
        setErrorMessage("Check Again");
      }
    }
  };

  return (
    <div className="form">
      <form>
        <div className="container">
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="input">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {action === "Sign Up" ? (
            <div></div>
          ) : (
            <div className="forget-password">
              Forget Password? <span>Click Here!</span>
            </div>
          )}
          <div className="submit-container">
            <div
              className={action === "Login" ? "submit gray" : "submit"}
              onClick={() => {
                setAction("Sign Up");
                console.log("Sign Up button clicked!");
                handleSignUp();
              }}
            >
              Sign Up
            </div>
            <div
              className={action === "Sign Up" ? "submit gray" : "submit"}
              onClick={() => {
                setAction("Login");
                console.log("Login button clicked!");
                handleLoginIn();
              }}
            >
              Login
            </div>
          </div>
          {isSignUpSuccess && (
            <div className="success-message">
              Successfully signed up! You need to login to the application.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
