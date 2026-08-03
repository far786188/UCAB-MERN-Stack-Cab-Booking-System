import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ARegister() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerAdmin = async () => {

    try {

      await axios.post(
        "http://localhost:8000/api/admin/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Admin Registered Successfully");

      navigate("/admin/login");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (

    <div
      style={{
        background:"#fff7d6",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      }}
    >

      <div
        style={{
          width:"350px",
          background:"#fff",
          padding:"30px",
          borderRadius:"10px",
          boxShadow:"0px 0px 10px lightgray",
        }}
      >

        <h2
          style={{
            textAlign:"center",
            marginBottom:"20px",
          }}
        >
          Admin Register
        </h2>

        <input
          type="text"
          placeholder="Admin Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          style={buttonStyle}
          onClick={registerAdmin}
        >
          Register
        </button>

        <p
          style={{
            textAlign:"center",
            marginTop:"15px",
          }}
        >
          Already Registered?
        </p>

        <Link to="/admin/login">
          <button style={buttonStyle}>
            Login
          </button>
        </Link>

      </div>

    </div>

  );
}

const inputStyle = {
  width:"100%",
  padding:"12px",
  marginTop:"12px",
  border:"1px solid #ccc",
  borderRadius:"5px",
  boxSizing:"border-box",
};

const buttonStyle = {
  width:"100%",
  padding:"12px",
  marginTop:"15px",
  background:"#f4b400",
  border:"none",
  borderRadius:"5px",
  fontWeight:"bold",
  cursor:"pointer",
};

export default ARegister;