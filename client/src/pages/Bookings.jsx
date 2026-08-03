import { useEffect, useState } from "react";
import axios from "axios";
import ANav from "../components/ANav";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8000/api/bookings/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load bookings");
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
        <h2>All Bookings</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
          }}
        >
          <thead>
            <tr style={{ background: "#f4b400" }}>
              <th style={cell}>User</th>
              <th style={cell}>Cab</th>
              <th style={cell}>Pickup</th>
              <th style={cell}>Drop</th>
              <th style={cell}>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td style={cell}>
                  {booking.user?.name || "N/A"}
                </td>

                <td style={cell}>
                  {booking.cab?.carName || "N/A"}
                </td>

                <td style={cell}>
                  {booking.pickupLocation}
                </td>

                <td style={cell}>
                  {booking.dropLocation}
                </td>

                <td style={cell}>
                  {booking.status}
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

export default Bookings;