import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addRooms"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>Add Rooms</p>
        </div>
      </Link>

      <Link to={"/addService"} style={{ textDecoration: "none" }}>
        {" "}
        <div className="sidebar-item">
          <p>Add Services</p>
        </div>
      </Link>
      <Link to={"/addStaff"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>Add Staff</p>
        </div>
      </Link>
      <Link to={"/editRooms"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>Edit Rooms</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
