import React, { useState, ChangeEvent, FormEvent } from "react";
import "./SignUp.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useNavigate } from "react-router-dom";
import CreateData from "../Server/CreateData";
import bcrypt from "bcryptjs-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const [action, setAction] = useState("Sign Up");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [signupData, setSignupData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [formValid, setFormValid] = useState(false);

  const renderSuccessMessage = () => (
    <div className="success">Successfully login...</div>
  );
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(`Updated ${name}: ${value}`);
    setSignupData({ ...signupData, [name]: value });

    const isNameValid = name === "name" && value.trim() !== "";
    const isEmailValid =
      name === "email" && value.includes("@") && value.includes(".");
    const isPasswordValid = name === "password" && value.length >= 4;

    setIsFormValid(isEmailValid || isPasswordValid || isNameValid);
  };

  const clickSignUp = async (event: FormEvent) => {
    event.preventDefault();
    // setIsSignUpSuccess(true);
    setIsLoginFormVisible(true);
    if (!signupData.name || !signupData.email || !signupData.password) {
      setErrorMessage("Please enter all required fields");
      return;
    }
    try {
      const encryptPassword = await bcrypt.hash(signupData.password, 10);
      console.log("encrypted", encryptPassword);
      const response = await CreateData({
        name: signupData.name,
        email: signupData.email,
        password: encryptPassword,
        age: "",
        gender: "",
        university: "",
      });
      if (response) {
        toast.success("Signup succulfully, Please login!");
        console.log(toast.success);
        navigate("/");
        console.log("Successfully Signed Up");
      } else {
        setErrorMessage("Sign Up Failed, This user email already exists.");
      }
    } catch (error) {
      console.log("Sign Up Failed, please try again");
      setErrorMessage("Sign Up Failed, please try again");
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <form>
        <div className="container">
          <div className="header">
            <div className="text">Sign Up</div>
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
                  name="name"
                  placeholder="Username"
                  value={signupData.name}
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
                value={signupData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleChange}
              />
            </div>
            <div className="error-message">{errorMessage}</div>
          </div>

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
              onClick={(event) => {
                setAction("Sign Up");
                if (isFormValid) {
                  clickSignUp(event);
                  console.log("Sign Up button clicked!");
                }
                // setErrorMessage("Please enter valid Credentials");
              }}
            >
              Sign Up
            </div>
            <div
              className={action === "Sign Up" ? "submit gray" : "submit"}
              onClick={() => {
                setAction("Login");
                console.log("Login button clicked!");
              }}
            >
              Login
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// export default LoginSignup;
