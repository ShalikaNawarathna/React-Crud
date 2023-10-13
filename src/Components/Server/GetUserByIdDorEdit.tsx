import React from "react";
import UserDBData from "../Model/UserDBData";
import Axios from "axios";

const GetUserByIdDorEdit = (email: string) => {
  return Axios.get<UserDBData[]>(`https://localhost:7154/api/User/${email}`)
    .then((response) => {
      console.log("API resoponese ", response.data);
      return response;
    })
    .catch((error: any) => {
      console.error("Error fetching user data:", error);
    });
};

export default GetUserByIdDorEdit;
