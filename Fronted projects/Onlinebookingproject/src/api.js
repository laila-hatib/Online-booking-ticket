import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: { "Content-Type": "application/json" },
});

export const loginUser = (data) => api.post("login/", data);
export const createBooking = (data) => api.post("bookings/", data);
export const getUserBookings = (userId) => api.get(`bookings/?user=${userId}`);
// api.js
export const getUsersWithBookings = () => api.get('admin/users-bookings/');


export default api;
