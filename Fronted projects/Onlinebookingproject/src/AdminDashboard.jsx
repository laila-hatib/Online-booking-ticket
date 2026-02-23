import React, { useState, useEffect } from "react";
import axios from "./api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  // fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("users/");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get("bookings/");
      setBookings(response.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBookings();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      {/* Users Table */}
      <h2>Registered Users</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%", marginBottom: "30px" }}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.first_name} {u.last_name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bookings Table */}
      <h2>All Bookings</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Time</th>
            <th>Seats</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{users.find(u => u.id === b.user)?.first_name} {users.find(u => u.id === b.user)?.last_name}</td>
              <td>{b.travel_date}</td>
              <td>{b.travel_time}</td>
              <td>{b.number_of_seats}</td>
              <td>{b.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
