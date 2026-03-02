import React, { useState } from "react";
import { registerUser } from "./api";

const Register = ({ setPage }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getErrorMessage = (err) => {
    if (!err.response) {
      return "Cannot connect to backend. Start Django server on http://127.0.0.1:8000.";
    }

    const data = err.response.data;
    if (!data) return "Registration failed. Try again.";
    if (typeof data === "string") return data;
    if (data.error) return data.error;
    if (data.detail) return data.detail;

    const firstKey = Object.keys(data)[0];
    if (!firstKey) return "Registration failed. Try again.";
    const firstValue = data[firstKey];
    if (Array.isArray(firstValue) && firstValue.length) {
      return `${firstKey}: ${firstValue[0]}`;
    }
    return `${firstKey}: ${firstValue}`;
  };

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      setError("First name, last name, phone number, email, and password are required.");
      return;
    }

    try {
      await registerUser({
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email,
        password: password,
        role: "user", // all registering users are normal users
      });
      setSuccess("Registration successful! You can now login.");
      setTimeout(() => setPage("login"), 1500); // redirect to login after 1.5s
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br /><br />
      <input
        type="text"
        placeholder="Middle Name"
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
      />
      <br /><br />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br /><br />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <br /><br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => setPage("login")} style={{ marginLeft: "10px" }}>
        Back to Login
      </button>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Register;
