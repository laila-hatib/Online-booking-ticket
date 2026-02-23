import React, { useState, useEffect } from "react";
import { createBooking, getUserBookings } from "./api";

// Booking Form
const BookingForm = ({ user, onBookingSuccess }) => {
  const [travelDate, setTravelDate] = useState("");
  const [travelTime, setTravelTime] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!travelDate || !travelTime || !seats || !price) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await createBooking({
        user: user.id,
        travel_date: travelDate,
        travel_time: travelTime,
        number_of_seats: seats,
        price: price,
      });

      alert("Booking created successfully!");
      setTravelDate(""); setTravelTime(""); setSeats(""); setPrice("");
      onBookingSuccess(); // Refresh bookings in parent
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Booking</h2>
      <input type="date" value={travelDate} onChange={e => setTravelDate(e.target.value)} />
      <br /><br />
      <input type="time" value={travelTime} onChange={e => setTravelTime(e.target.value)} />
      <br /><br />
      <input type="number" placeholder="Seats" value={seats} onChange={e => setSeats(e.target.value)} />
      <br /><br />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <br /><br />
      <button onClick={handleBooking} disabled={loading}>
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
};

// View Bookings
const ViewBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getUserBookings(user.id);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
          {bookings.map(b => (
            <li key={b.id}>
              Date: {b.travel_date}, Time: {b.travel_time}, Seats: {b.number_of_seats}, Price: {b.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Main User Dashboard
const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [page, setPage] = useState("dashboard"); // "dashboard" / "booking" / "view"
  const [refresh, setRefresh] = useState(false); // used to refresh bookings after new booking

  if (!user) return <div>Please login first</div>;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Dashboard */}
      {page === "dashboard" && (
        <>
          <h1>Welcome, {user.first_name}</h1>
          <p>Email: {user.email}</p>

          <h2>Actions:</h2>
          <button onClick={() => setPage("booking")}>Book a Ticket</button>
          <button onClick={() => setPage("view")}>View Your Bookings</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {/* Booking Page */}
      {page === "booking" && (
        <>
          <button onClick={() => setPage("dashboard")}>Back</button>
          <BookingForm user={user} onBookingSuccess={() => setRefresh(!refresh)} />
        </>
      )}

      {/* View Bookings */}
      {page === "view" && (
        <>
          <button onClick={() => setPage("dashboard")}>Back</button>
          <ViewBookings key={refresh} user={user} />
        </>
      )}
    </div>
  );
};

export default UserDashboard;
