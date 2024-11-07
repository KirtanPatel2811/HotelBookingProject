import React from "react";
import "./Admin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddRoom from "../../Components/addRoom/AddRoom";
import AddService from "../../Components/addServices/AddService";
import AddStaff from "../../Components/addStaff/AddStaff";
import EditRooms from "../../Components/EditRooms/EditRooms"; // Import EditRooms component

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addRooms" element={<AddRoom />} />
        <Route path="/addService" element={<AddService />} />
        <Route path="/addStaff" element={<AddStaff />} />
        <Route path="/editRooms" element={<EditRooms />} />{" "}
      </Routes>
    </div>
  );
};

export default Admin;
