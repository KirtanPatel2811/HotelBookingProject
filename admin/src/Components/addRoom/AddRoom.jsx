import React, { useState } from "react";
import "./AddRoom.css";

const AddRoom = () => {
  const [RoomDetails, setRoomDetails] = useState({
    RoomName: "",
    RoomType: "",
    NumberOfBeds: "",
    PricePerNight: "",
    Availability: false,
    Description: "",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const imageHandler = (e) => {
    setImages(Array.from(e.target.files));
  };

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomDetails({
      ...RoomDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!RoomDetails.RoomName) newErrors.RoomName = "Room name is required";
    if (!RoomDetails.RoomType) newErrors.RoomType = "Room type is required";
    if (!RoomDetails.NumberOfBeds)
      newErrors.NumberOfBeds = "Number of beds is required";
    if (!RoomDetails.PricePerNight)
      newErrors.PricePerNight = "Price per night is required";
    if (!RoomDetails.Description)
      newErrors.Description = "Description is required";
    if (images.length === 0)
      newErrors.Images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const AddRoom = async () => {
    if (!validateForm()) return;

    let formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    formData.append("RoomName", RoomDetails.RoomName);
    formData.append("RoomType", RoomDetails.RoomType);
    formData.append("NumberOfBeds", RoomDetails.NumberOfBeds);
    formData.append("PricePerNight", RoomDetails.PricePerNight);
    formData.append("Availability", RoomDetails.Availability);
    formData.append("Description", RoomDetails.Description);

    await fetch("http://localhost:3003/api/rooms/addRooms", {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.message === "Room added successfully"
          ? alert("Room Added")
          : alert("Failed to add room");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="addRoom">
      <div className="addRoom-itemfield">
        <p>Room Name</p>
        <input
          value={RoomDetails.RoomName}
          onChange={changeHandler}
          type="text"
          name="RoomName"
          placeholder="Enter Room Name"
        />
      </div>

      <div className="addRoom-itemfield">
        <p>Room Type</p>
        <input
          value={RoomDetails.RoomType}
          onChange={changeHandler}
          type="text"
          name="RoomType"
          placeholder="Enter Room Type"
        />
      </div>

      <div className="addRoom-itemfield">
        <p>Number of Beds</p>
        <input
          value={RoomDetails.NumberOfBeds}
          onChange={changeHandler}
          type="number"
          name="NumberOfBeds"
          placeholder="Enter Number of Beds"
        />
      </div>

      <div className="addRoom-itemfield">
        <p>Price Per Night</p>
        <input
          value={RoomDetails.PricePerNight}
          onChange={changeHandler}
          type="number"
          name="PricePerNight"
          placeholder="Enter Price Per Night"
        />
      </div>

      <div className="addRoom-itemfield">
        <p>Availability</p>
        <input
          type="checkbox"
          checked={RoomDetails.Availability}
          onChange={changeHandler}
          name="Availability"
        />
      </div>

      <div className="addRoom-itemfield">
        <p>Room Description</p>
        <textarea
          value={RoomDetails.Description}
          onChange={changeHandler}
          name="Description"
          placeholder="Enter Room Description"
        />
      </div>

      <div className="addRoom-itemfield">
        <p>Room Images</p>
        <input onChange={imageHandler} type="file" name="images" multiple />
      </div>

      {Object.keys(errors).map((key) => (
        <p key={key} style={{ color: "red" }}>
          {errors[key]}
        </p>
      ))}

      <button onClick={AddRoom} type="submit" className="addRoom-button">
        Add Room
      </button>
    </div>
  );
};

export default AddRoom;
