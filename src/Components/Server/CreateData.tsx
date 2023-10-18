import React from "react";
import UserDBData from "../Model/UserDBData";
import Axios from "axios";

const CreateData = (userData: UserDBData) => {
  const defaultUserData: UserDBData = {
    ...userData,
    age: userData.age || "",
    gender: userData.gender || "",
    university: userData.university || "",
  };
  return Axios.post<UserDBData[]>(
    "https://localhost:7154/api/User/createUser",
    defaultUserData
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default CreateData;
