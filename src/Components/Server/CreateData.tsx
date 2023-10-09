import React from "react";
import UserDBData from "../Model/UserDBData";
import Axios from "axios";

const CreateData = (userData: UserDBData) => {
  return Axios.post<UserDBData[]>(
    "https://localhost:7154/api/User/createUser",
    userData
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error of creating new user", error);
    });
};

export default CreateData;
