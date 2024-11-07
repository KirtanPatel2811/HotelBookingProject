import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const EditRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [roomData, setRoomData] = useState({
    RoomName: "",
    RoomType: "",
    NumberOfBeds: "",
    PricePerNight: "",
    Availability: "",
    Description: "",
  });
  const history = useHistory();

  useEffect(() => {
    // Fetch all rooms from the server
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/rooms/${id}"
        );
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms", error);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomChange = (event) => {
    const roomId = event.target.value;
    setSelectedRoom(roomId);
    // Fetch the selected room details for editing
    const selected = rooms.find((room) => room._id === roomId);
    if (selected) {
      setRoomData({
        RoomName: selected.RoomName,
        RoomType: selected.RoomType,
        NumberOfBeds: selected.NumberOfBeds,
        PricePerNight: selected.PricePerNight,
        Availability: selected.Availability,
        Description: selected.Description,
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/rooms/${selectedRoom}`,
        roomData
      );
      history.push("/adminDashboard"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating room", error);
    }
  };

  return (
    <div>
      <h2>Edit Room</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="room">Select Room:</label>
          <select
            id="room"
            value={selectedRoom}
            onChange={handleRoomChange}
            required
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.RoomName}
              </option>
            ))}
          </select>
        </div>

        {selectedRoom && (
          <>
            <div>
              <label htmlFor="RoomName">Room Name:</label>
              <input
                type="text"
                id="RoomName"
                name="RoomName"
                value={roomData.RoomName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="RoomType">Room Type:</label>
              <input
                type="text"
                id="RoomType"
                name="RoomType"
                value={roomData.RoomType}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="NumberOfBeds">Number of Beds:</label>
              <input
                type="number"
                id="NumberOfBeds"
                name="NumberOfBeds"
                value={roomData.NumberOfBeds}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="PricePerNight">Price per Night:</label>
              <input
                type="number"
                id="PricePerNight"
                name="PricePerNight"
                value={roomData.PricePerNight}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="Availability">Availability:</label>
              <input
                type="text"
                id="Availability"
                name="Availability"
                value={roomData.Availability}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="Description">Description:</label>
              <textarea
                id="Description"
                name="Description"
                value={roomData.Description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <button type="submit">Update Room</button>
          </>
        )}
      </form>
    </div>
  );
};

export default EditRooms;
