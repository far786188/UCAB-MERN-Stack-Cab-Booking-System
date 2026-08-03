import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ANav from "../components/ANav";

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = res.data.find((u) => u._id === id);

      if (user) {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to load user");
    }
  };

  const updateUser = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8000/api/users/${id}`,
        {
          name,
          email,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User Updated Successfully");

      navigate("/admin/users");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <>
      <ANav />

      <div
        style={{
          background: "#fff7d6",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        <div
          style={{
            width: "400px",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <h2>Edit User</h2>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            style={inputStyle}
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={inputStyle}
          />

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            style={inputStyle}
          />

          <button
            style={buttonStyle}
            onClick={updateUser}
          >
            Update User
          </button>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  background: "#f4b400",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
};

export default UserEdit;