import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginSignup } from "./Components/LoginSignup/LoginSignup.tsx";
import Dashboard from "./Components/Dashboard/Dashboard.tsx";
import CreateTableData from "./Components/View/CreateTableData.tsx";
import EditTableData from "./Components/View/EditTableData.tsx";
import Footer from "./Components/Dashboard/Footer.tsx";
import { SignUp } from "./Components/LoginSignup/SignUp.tsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/create" element={<CreateTableData />} />
          <Route path="/edit/:email" element={<EditTableData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
