import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ANav from "../components/ANav";

function AHome() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    totalCars: 0,
    totalBookings: 0,
    completedRides: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setDashboard(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
      <ANav />

      <div
        style={{
          background: "#fff7d6",
          minHeight: "100vh",
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h1>Admin Dashboard</h1>

        <p style={{ marginBottom: "30px" }}>
          Manage Users, Cabs and Bookings
        </p>

        {/* Dashboard Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "50px",
          }}
        >
          <div style={cardStyle}>
            <h3>Total Users</h3>
            <h2>{dashboard.totalUsers}</h2>
          </div>

          <div style={cardStyle}>
            <h3>Total Drivers</h3>
            <h2>{dashboard.totalDrivers}</h2>
          </div>

          <div style={cardStyle}>
            <h3>Total Cars</h3>
            <h2>{dashboard.totalCars}</h2>
          </div>

          <div style={cardStyle}>
            <h3>Total Bookings</h3>
            <h2>{dashboard.totalBookings}</h2>
          </div>

          <div style={cardStyle}>
            <h3>Completed Rides</h3>
            <h2>{dashboard.completedRides}</h2>
          </div>
        </div>

        {/* Admin Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 250px)",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          <Link to="/admin/users">
            <button style={buttonStyle}>Manage Users</button>
          </Link>

          <Link to="/admin/cabs">
            <button style={buttonStyle}>Manage Cabs</button>
          </Link>

          <Link to="/admin/bookings">
            <button style={buttonStyle}>View Bookings</button>
          </Link>

          <Link to="/admin/addcar">
            <button style={buttonStyle}>Add New Car</button>
          </Link>
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  textAlign: "center",
};

const buttonStyle = {
  width: "250px",
  height: "80px",
  background: "#f4b400",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

export default AHome;