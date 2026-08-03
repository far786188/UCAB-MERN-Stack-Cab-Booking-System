import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const registerUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/register",
        {
          name,
          email,
          password,
          phone,
        }
      );

      alert("Registration Successful!");

      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div
      style={{
        background: "#fff7d6",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "350px",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px lightgray",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          style={buttonStyle}
          onClick={registerUser}
        >
          Signup
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "10px",
          }}
        >
          Already have an account?
        </p>

        <Link to="/login">
          <button style={buttonStyle}>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  background: "#f4b400",
  color: "black",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Register;