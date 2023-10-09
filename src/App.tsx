import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard.tsx";
import CreateTableData from "./Components/View/CreateTableData.tsx";
import EditTableData from "./Components/View/EditTableData.tsx";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  // const [users, setUsers] = useState<UserData[]>([]);

  // const onAddUser = (newUser: any) => {
  //   setUsers([...users, newUser]);
  // };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/dashboard/*" element={<Dashboard />}></Route>
          <Route path="/create" element={<CreateTableData />}></Route>
          <Route path="/edit/:id" element={<EditTableData />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
