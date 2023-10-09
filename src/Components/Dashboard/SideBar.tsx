import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <SiShopware /> <span>Shoppy</span>
        </Link>
      </div>
      {/* Close Button */}
      <button type="button" className="close-btn">
        <MdOutlineCancel />
      </button>
      {/* Links */}
      <div className="links">
        {/* Example Link */}
        <NavLink to="/example">Example</NavLink>
        {/* Add more links as needed */}
      </div>
    </div>
  );
};

export default SideBar;
