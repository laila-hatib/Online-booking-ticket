import React, { useEffect, useState } from "react";
import { getBookings } from "../api";

const AdminViewBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings().then(res => setBookings(res.data));
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      <ul>
        {bookings.map((b) => (
          <li key={b.id}>
            User ID: {b.user} | Date: {b.travel_date} | Seats: {b.number_of_seats}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminViewBookings;
