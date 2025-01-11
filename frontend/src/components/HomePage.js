import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css'

function HomePage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      navigate(`/repos/${username}`);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>GitHub User Repository Viewer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default HomePage;
