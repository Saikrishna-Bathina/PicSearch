import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import api from "./api/api";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/auth/user");
        if (res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      navigate("/");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      {user && <Navbar user={user} onLogout={handleLogout} />}

      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              user ? <Dashboard user={user} /> : <Login />
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}
