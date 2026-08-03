import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function DriverRegister() {
  const navigate = useNavigate();

  const [driver, setDriver] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    licenseNumber: "",
    vehicleNumber: "",
  });

  const handleChange = (e) => {
    setDriver({
      ...driver,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/drivers/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(driver),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        navigate("/driver/login");
      }
    } catch (error) {
      alert("Server Error");
    }
  };

  return (
    <div
      style={{
        background: "#fff7d6",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "30px",
          width: "400px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Driver Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          style={input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={input}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          style={input}
          required
        />

        <input
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          onChange={handleChange}
          style={input}
          required
        />

        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          onChange={handleChange}
          style={input}
          required
        />

        <button style={button}>Register</button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already Registered?{" "}
          <Link to="/driver/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  boxSizing: "border-box",
};

const button = {
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  background: "#f4b400",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
};

export default DriverRegister;