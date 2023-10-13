import React from "react";
import UserDBData from "../Model/UserDBData";
import Axios from "axios";

const UpdateUser = (email: string, userData: UserDBData) => {
  return Axios.put(
    `https://localhost:7154/api/User/updateUser/${encodeURIComponent(email)}`,
    userData
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default UpdateUser;
