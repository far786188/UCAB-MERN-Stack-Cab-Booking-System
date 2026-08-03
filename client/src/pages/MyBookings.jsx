import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";
import UNav from "../components/UNav";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8000/api/bookings/my",
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

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:8000/api/bookings/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      fetchBookings();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Cancellation Failed");
    }
  };

  const downloadReceipt = (booking) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("UCAB Ride Receipt", 20, 20);

    doc.setFontSize(12);

    doc.text(`Booking ID : ${booking._id}`, 20, 40);
    doc.text(`Cab : ${booking.cab?.carName}`, 20, 50);
    doc.text(`Pickup : ${booking.pickupLocation}`, 20, 60);
    doc.text(`Drop : ${booking.dropLocation}`, 20, 70);
    doc.text(`Fare : ₹${booking.fare}`, 20, 80);
    doc.text(`Status : ${booking.status}`, 20, 90);

    doc.save("RideReceipt.pdf");
  };

  return (
    <>
      <UNav />

      <div
        style={{
          background: "#fff7d6",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          My Bookings
        </h1>

        <table
          style={{
            width: "100%",
            marginTop: "30px",
            borderCollapse: "collapse",
            background: "#fff",
          }}
        >
          <thead>
            <tr style={{ background: "#f4b400" }}>
              <th style={cell}>Cab</th>
              <th style={cell}>Pickup</th>
              <th style={cell}>Drop</th>
              <th style={cell}>Date</th>
              <th style={cell}>Time</th>
              <th style={cell}>Fare</th>
              <th style={cell}>Status</th>
              <th style={cell}>Action</th>
              <th style={cell}>Receipt</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td style={cell}>{booking.cab?.carName}</td>

                <td style={cell}>{booking.pickupLocation}</td>

                <td style={cell}>{booking.dropLocation}</td>

                <td style={cell}>{booking.bookingDate || "-"}</td>

                <td style={cell}>{booking.bookingTime || "-"}</td>

                <td style={cell}>₹{booking.fare}</td>

                <td style={cell}>{booking.status}</td>

                <td style={cell}>
                  {(booking.status === "Pending" ||
                    booking.status === "Accepted") ? (
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  ) : booking.status === "Ride Started" ? (
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                      🚕 Ride Started
                    </span>
                  ) : booking.status === "Completed" ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      ✅ Completed
                    </span>
                  ) : booking.status === "Cancelled" ? (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      ❌ Cancelled
                    </span>
                  ) : (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      ❌ Rejected
                    </span>
                  )}
                </td>

                <td style={cell}>
                  {booking.status === "Completed" ? (
                    <button
                      onClick={() => downloadReceipt(booking)}
                      style={{
                        background: "green",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      📄 Download
                    </button>
                  ) : (
                    "-"
                  )}
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
  padding: "12px",
  textAlign: "center",
};

export default MyBookings;