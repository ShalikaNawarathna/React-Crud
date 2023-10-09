// import React, { useState, ChangeEvent, FormEvent } from "react";
// import "./LoginSignup.css";
// import user_icon from "../Assets/person.png";
// import email_icon from "../Assets/email.png";
// import password_icon from "../Assets/password.png";
// import { useNavigate } from "react-router-dom";

// interface FormData {
//   username: string;
//   email: string;
//   password: string;
// }

// const LoginSignup: React.FC = () => {
//   const [action, setAction] = useState("Sign Up");
//   const [formData, setFormData] = useState<FormData>({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [errorMessages, setErrorMessages] = useState<{
//     field?: string;
//     message?: string;
//   }>({});
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const errors = {
//     username: "Invalid Username",
//     password: "Invalid Password",
//   };

//   const renderSuccessMessage = () => (
//     <div className="success">Successfully login...</div>
//   );
//   const navigate = useNavigate();

//   const database = [
//     {
//       username: "Shalu",
//       password: "1234",
//     },
//     {
//       username: "Shalika",
//       password: "1234",
//     },
//   ];

//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault();
//     console.log("Form submitted");
//     const { username, password } = formData;

//     if (!username) {
//       setErrorMessages({
//         field: "empty",
//         message: "Username is required",
//       });
//       console.log("Empty username");
//       return;
//     }

//     if (!password) {
//       setErrorMessages({
//         field: "empty",
//         message: "Password is required",
//       });
//       console.log("Empty password");
//       return;
//     }

//     const userData = database.find((user) => user.username === username);

//     if (userData) {
//       if (userData.password !== password) {
//         setErrorMessages({ field: "password", message: errors.password });
//       } else {
//         setIsSubmitted(true);
//         navigate("/dashboard", { replace: true });
//       }
//     } else {
//       setErrorMessages({ field: "username", message: errors.username });
//     }
//   };

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//     //console.log(`Updated formData: ${JSON.stringify(formData)}`);
//   };

//   const renderErrorMessage = (field: string) =>
//     field === errorMessages.field && (
//       <div className="error">{errorMessages.message}</div>
//     );

//   return (
//     <div className="form">
//       <form onSubmit={handleSubmit}>
//         <div className="container">
//           <div className="header">
//             <div className="text">{action}</div>
//             <div className="underline"></div>
//           </div>
//           <div className="inputs">
//             {action === "Login" ? (
//               <div></div>
//             ) : (
//               <div className="input">
//                 <img src={user_icon} alt="" />
//                 <input
//                   type="text"
//                   name="username"
//                   placeholder="Username"
//                   value={formData.username}
//                   onChange={handleChange}
//                 />
//               </div>
//             )}
//             <div className="input">
//               <img src={email_icon} alt="" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="input">
//               <img src={password_icon} alt="" />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           {action === "Sign Up" ? (
//             <div></div>
//           ) : (
//             <div className="forget-password">
//               Forget Password? <span>Click Here!</span>
//             </div>
//           )}
//           <div className="submit-container">
//             <div
//               className={action === "Login" ? "submit gray" : "submit"}
//               onClick={() => {
//                 setAction("Sign Up");
//                 console.log("Sign Up button clicked!");
//               }}
//             >
//               Sign Up
//             </div>
//             <div
//               className={action === "Sign Up" ? "submit gray" : "submit"}
//               onClick={() => {
//                 setAction("Login");
//                 console.log("Login button clicked!");
//               }}
//             >
//               Login
//             </div>
//           </div>
//           {renderErrorMessage("username")}
//           {renderErrorMessage("password")}
//           {errorMessages.field === "empty" && (
//             <div className="error">{errorMessages.message}</div>
//           )}
//           {isSubmitted ? renderSuccessMessage() : null}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginSignup;
