import React, { useState } from "react";
import "./AddService.css";

const AddService = () => {
  const [ServiceDetails, setServiceDetails] = useState({
    ServiceName: "",
    ServiceDescription: "",
    ServicePrice: "",
  });

  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setServiceDetails({
      ...ServiceDetails,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!ServiceDetails.ServiceName)
      newErrors.ServiceName = "Service name is required";
    if (!ServiceDetails.ServiceDescription)
      newErrors.ServiceDescription = "Service description is required";
    if (!ServiceDetails.ServicePrice)
      newErrors.ServicePrice = "Service price is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addService = async () => {
    if (!validateForm()) return;

    await fetch("http://localhost:3003/api/services/addService", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ServiceDetails),
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.message === "Service added successfully"
          ? alert("Service Added")
          : alert("Failed to add service");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="addService">
      <div className="addService-itemfield">
        <p>Service Name</p>
        <input
          value={ServiceDetails.ServiceName}
          onChange={changeHandler}
          type="text"
          name="ServiceName"
          placeholder="Enter Service Name"
        />
      </div>

      <div className="addService-itemfield">
        <p>Service Description</p>
        <textarea
          value={ServiceDetails.ServiceDescription}
          onChange={changeHandler}
          name="ServiceDescription"
          placeholder="Enter Service Description"
        />
      </div>

      <div className="addService-itemfield">
        <p>Service Price</p>
        <input
          value={ServiceDetails.ServicePrice}
          onChange={changeHandler}
          type="number"
          name="ServicePrice"
          placeholder="Enter Service Price"
        />
      </div>

      {Object.keys(errors).map((key) => (
        <p key={key} style={{ color: "red" }}>
          {errors[key]}
        </p>
      ))}

      <button onClick={addService} type="submit" className="addService-button">
        Add Service
      </button>
    </div>
  );
};

export default AddService;
