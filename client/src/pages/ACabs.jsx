import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ANav from "../components/ANav";

function ACabs() {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    getCabs();
  }, []);

  const getCabs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/cabs/all");
      setCabs(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load cabs");
    }
  };

  return (
    <>
      <ANav />

      <div
        style={{
          background: "#fff7d6",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <h2>Manage Cabs</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
          }}
        >
          <thead>
            <tr style={{ background: "#f4b400" }}>
              <th style={cell}>Image</th>
              <th style={cell}>Model</th>
              <th style={cell}>Type</th>
              <th style={cell}>Car No</th>
              <th style={cell}>Seats</th>
              <th style={cell}>Price</th>
              <th style={cell}>Action</th>
            </tr>
          </thead>

          <tbody>
            {cabs.map((cab) => (
              <tr key={cab._id}>
                <td style={cell}>
                  <img
                    src={`http://localhost:8000/uploads/${cab.image}`}
                    alt={cab.carName}
                    width="100"
                    height="70"
                    style={{ objectFit: "cover", borderRadius: "6px" }}
                  />
                </td>

                <td style={cell}>{cab.carName}</td>

                <td style={cell}>{cab.carType}</td>

                <td style={cell}>{cab.carNumber}</td>

                <td style={cell}>{cab.seats}</td>

                <td style={cell}>₹{cab.pricePerKm}/km</td>

                <td style={cell}>
                  <Link to={`/admin/cabedit/${cab._id}`}>
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

export default ACabs;