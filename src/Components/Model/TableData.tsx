import React from "react";
import { useNavigate } from "react-router-dom";
export interface UserData {
  id: number;
  name: string;
  email: string;
  age: string;
  gender: string;
  university: string;
}

export const onAddUser = (newUser: UserData) => {
  TableData.push(newUser);
};

//update the data
export const onUpdateUser = (updateUser: UserData) => {
  const index = TableData.findIndex((user) => user.id === updateUser.id);
  if (index !== -1) {
    TableData[index] = updateUser;
  }
};

const TableData: UserData[] = [
  {
    id: 1,
    name: "Shivansh Sharma",
    email: "shiva234@gmail.com",
    age: "23",
    gender: "Male",
    university: "University of Washington",
  },
  {
    id: 2,
    name: "Simran Kures",
    email: "simran@gmail.com",
    age: "22",
    gender: "Female",
    university: "University of California",
  },
  {
    id: 3,
    name: "Methal Shivansh",
    email: "methal@gmail.com",
    age: "28",
    gender: "Male",
    university: "University of Colorado",
  },
  {
    id: 4,
    name: "Nirman Kames",
    email: "nirman34@gmail.com",
    age: "24",
    gender: "Male",
    university: "University of Cambridge",
  },
];

export default TableData;
