import React, { useState, useEffect } from "react";
import { getUserBookings } from "./api";

const ViewBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getUserBookings(user.id);
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.id]);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              Date: {b.travel_date}, Time: {b.travel_time}, Seats: {b.number_of_seats}, Price: {b.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewBookings;
