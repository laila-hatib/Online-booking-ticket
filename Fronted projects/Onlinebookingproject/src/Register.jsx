import React, { useState } from "react";
import axios from "axios";

const Register = ({ setPage }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/users/", {
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
      setError("Registration failed. Try again.");
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
