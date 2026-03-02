import axios from "axios";

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const apiBaseUrl = rawApiBaseUrl.endsWith("/") ? rawApiBaseUrl : `${rawApiBaseUrl}/`;

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: { "Content-Type": "application/json" },
});

export const loginUser = (data) => api.post("login/", data);
export const registerUser = (data) => api.post("users/", data);
export const createBooking = (data) => api.post("bookings/", data);
export const getUserBookings = (userId) => api.get(`bookings/?user=${userId}`);
// api.js
export const getUsersWithBookings = () => api.get('admin/users-bookings/');


export default api;
