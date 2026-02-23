import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const App = () => {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      if (storedUser.role === "admin") {
        setPage("adminDashboard");
      } else {
        setPage("userDashboard");
      }
    }
  }, []);

  return (
    <div>
      {page === "login" && <Login setUser={setUser} setPage={setPage} />}
      {page === "register" && <Register setPage={setPage} />}
      {page === "userDashboard" && <UserDashboard user={user} setPage={setPage} setUser={setUser} />}
      {page === "adminDashboard" && <AdminDashboard user={user} setPage={setPage} setUser={setUser} />}
    </div>
  );
};

export default App;
