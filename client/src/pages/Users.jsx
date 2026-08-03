import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ANav from "../components/ANav";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ANav />

      <div
        style={{
          padding: "30px",
          background: "#fff7d6",
          minHeight: "100vh",
        }}
      >
        <h2>Users</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
          }}
        >
          <thead>
            <tr style={{ background: "#f4b400" }}>
              <th style={cell}>Name</th>
              <th style={cell}>Email</th>
              <th style={cell}>Phone</th>
              <th style={cell}>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={cell}>{user.name}</td>
                <td style={cell}>{user.email}</td>
                <td style={cell}>{user.phone}</td>

                <td style={cell}>
                  <Link to={`/admin/useredit/${user._id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </>
  );
}

const cell = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
};

export default Users;