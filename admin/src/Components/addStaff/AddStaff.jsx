import React, { useState } from "react";
import "./AddStaff.css";

const AddStaff = () => {
  const [StaffDetails, setStaffDetails] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    Position: "",
    JoiningDate: "",
    Salary: "",
    DOB: "",
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setStaffDetails({
      ...StaffDetails,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!StaffDetails.FirstName) newErrors.FirstName = "First name is required";
    if (!StaffDetails.LastName) newErrors.LastName = "Last name is required";
    if (!StaffDetails.Email) newErrors.Email = "Email is required";
    if (!StaffDetails.PhoneNumber)
      newErrors.PhoneNumber = "Phone number is required";
    if (!StaffDetails.Position) newErrors.Position = "Position is required";
    if (!StaffDetails.JoiningDate)
      newErrors.JoiningDate = "Joining date is required";
    if (!StaffDetails.Salary) newErrors.Salary = "Salary is required";
    if (!StaffDetails.DOB) newErrors.DOB = "Date of birth is required";
    if (!image) newErrors.Image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const AddStaff = async () => {
    if (!validateForm()) return;

    let formData = new FormData();
    formData.append("Image", image);

    for (let key in StaffDetails) {
      formData.append(key, StaffDetails[key]);
    }

    await fetch("http://localhost:3003/api/staffs/addStaff", {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.message === "Staff added successfully"
          ? alert("Staff Added")
          : alert("Failed to add staff");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="addStaff">
      <div className="addStaff-itemfield">
        <p>First Name</p>
        <input
          value={StaffDetails.FirstName}
          onChange={changeHandler}
          type="text"
          name="FirstName"
          placeholder="Enter First Name"
        />
      </div>

      <div className="addStaff-itemfield">
        <p>Last Name</p>
        <input
          value={StaffDetails.LastName}
          onChange={changeHandler}
          type="text"
          name="LastName"
          placeholder="Enter Last Name"
        />
      </div>

      <div className="addStaff-itemfield">
        <p>Email</p>
        <input
          value={StaffDetails.Email}
          onChange={changeHandler}
          type="email"
          name="Email"
          placeholder="Enter Email"
        />
      </div>

      <div className="addStaff-itemfield">
        <p>Phone Number</p>
        <input
          value={StaffDetails.PhoneNumber}
          onChange={changeHandler}
          type="text"
          name="PhoneNumber"
          placeholder="Enter Phone Number"
        />
      </div>

      <div className="addStaff-itemfield">
        <p>Position</p>
        <input
          value={StaffDetails.Position}
          onChange={changeHandler}
          type="text"
          name="Position"
          placeholder="Enter Position"
        />
      </div>

      <div className="addStaff-itemfield">
        <p>Joining Date</p>
        <input
          value={StaffDetails.JoiningDate}
          onChange={changeHandler}
          type="date"
          name="JoiningDate"
        />
      </div>

      <div className="addStaff-itemfield">
        <p>Salary</p>
        <input
          value={StaffDetails.Salary}
          onChange={changeHandler}
          type="number"
          name="Salary"
          placeholder="Enter Salary"
        />
      </div>

      <div className="addStaff-itemfield">
        <p>Date of Birth</p>
        <input
          value={StaffDetails.DOB}
          onChange={changeHandler}
          type="date"
          name="DOB"
        />
      </div>

      <div className="addStaff-itemfield">
        <p>Staff Image</p>
        <input onChange={imageHandler} type="file" name="image" />
      </div>

      {Object.keys(errors).map((key) => (
        <p key={key} style={{ color: "red" }}>
          {errors[key]}
        </p>
      ))}

      <button onClick={AddStaff} type="submit" className="addStaff-button">
        Add Staff
      </button>
    </div>
  );
};

export default AddStaff;
