import React, { useState } from "react";
import { createBooking } from "../api";

const UserBooking = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [travel_date, setDate] = useState("");
  const [travel_time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [number_of_seats, setSeats] = useState("");

  const handleBooking = async () => {
    try {
      await createBooking({
        user: user.id,
        travel_date,
        travel_time,
        price,
        number_of_seats
      });

      alert("Booking Successful!");
    } catch (error) {
      alert("Booking Failed");
    }
  };

  return (
    <div>
      <h2>Book Ticket</h2>

      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <br /><br />

      <input type="time" onChange={(e) => setTime(e.target.value)} />
      <br /><br />

      <input
        type="number"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Seats"
        onChange={(e) => setSeats(e.target.value)}
      />
      <br /><br />

      <button onClick={handleBooking}>Book</button>
    </div>
  );
};

export default UserBooking;
