import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://rustyws.com/api/admin/login",
        { username, password },
        { withCredentials: true }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/admindashboard");
    } catch (err) {
      setError("Incorrect username or password");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4">
      <div className="w-full max-w-sm p-8 bg-neutral-800 text-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-500">Admin Login</h1>
        
        {error && (
          <p className="mb-4 text-center text-red-500 bg-red-100 py-2 rounded-md">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg border border-neutral-700 bg-neutral-700 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-600 transition-all duration-300"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg border border-neutral-700 bg-neutral-700 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-600 transition-all duration-300"
        />
        
        <button
          className="w-full py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-md"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
