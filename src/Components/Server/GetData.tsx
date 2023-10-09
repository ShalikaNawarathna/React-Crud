import React from "react";
import Axios from "axios";
import UserDBData from "../Model/UserDBData";

const GetData = () => {
  return Axios.get<UserDBData[]>("https://localhost:7154/api/User")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.message;
    });
};

export default GetData;
