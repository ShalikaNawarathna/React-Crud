import React from "react";
import Axios from "axios";

const DeleteUser = (userId: any) => {
  return Axios.delete(`https://localhost:7154/api/User/deleteUser/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error deleting user", error);
    });
};

export default DeleteUser;
