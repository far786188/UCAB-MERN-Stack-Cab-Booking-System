import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function DriverLogin() {
  const navigate = useNavigate();

  const [driver, setDriver] = useState({
    email: "",
    password: "",
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
        "http://localhost:8000/api/drivers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(driver),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("driverToken", data.token);
        localStorage.setItem("driver", JSON.stringify(data.driver));

        alert(data.message);

        navigate("/driver/home");
      } else {
        alert(data.message);
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
        <h2 style={{ textAlign: "center" }}>Driver Login</h2>

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

        <button style={button}>Login</button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          New Driver?{" "}
          <Link to="/driver/register">Register</Link>
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

export default DriverLogin;