import React from "react";
import UserDBData from "../Model/UserDBData";
import Axios from "axios";
import { LoginFormData } from "../LoginSignup/LoginSignup";

const GetUserByEmail = (email: string) => {
  return Axios.get<LoginFormData>(`https://localhost:7154/api/User/${email}`)
    .then((response) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error fetching user data:", error);
    });
};

export default GetUserByEmail;
