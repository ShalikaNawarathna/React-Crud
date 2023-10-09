import { useState } from "react";
import NavBar from "./NavBar.tsx";
import SideBar from "./SideBar.tsx";
import "./Dashboard.css";
import "./NavBar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowTable from "../View/ShowTable";
import CreateTableData from "../View/CreateTableData.tsx";
import EditTableData from "../View/EditTableData.tsx";

const Dashboard = () => {
  const [sidebarVisibility, setSideBarVisibility] = useState(true);
  const [navBarWidth, setNavBarWidth] = useState(false);

  const toogleSideBar = () => {
    setSideBarVisibility(!sidebarVisibility);
    setNavBarWidth(!navBarWidth);
  };
  return (
    <div className="dashboard-container">
      <div
        className={`navbar ${
          navBarWidth ? "navbar-width" : ""
        } bg-body-tertiary fixed-top p-4`}
      >
        {<NavBar toggleSidebar={toogleSideBar}></NavBar>}
      </div>
      <div className={`sidebar ${sidebarVisibility ? "visible" : "hidden"}`}>
        {<SideBar></SideBar>}
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<ShowTable />} />
          <Route path="/create" element={<CreateTableData />} />
          <Route path="/edit/:id" element={<EditTableData />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
