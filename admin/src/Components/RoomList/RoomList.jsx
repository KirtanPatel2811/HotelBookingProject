// RoomList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RoomList.css";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/rooms/allRooms"
        );
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="room-list">
      <h2>All Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} className="room-item">
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p>Price: {room.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
