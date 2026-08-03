import { useEffect, useState } from "react";
import DNav from "../components/DNav";

function DriverBookings() {
  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("driverToken");

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/bookings/driver",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, action) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/bookings/${action}/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      alert(data.message);

      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DNav />

      <div
        style={{
          background: "#fff7d6",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <h2>Driver Bookings</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ background: "#f4b400" }}>
              <th style={cell}>User</th>
              <th style={cell}>Pickup</th>
              <th style={cell}>Drop</th>
              <th style={cell}>Date</th>
              <th style={cell}>Time</th>
              <th style={cell}>Fare</th>
              <th style={cell}>Status</th>
              <th style={cell}>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td style={cell}>
                  {booking.user ? booking.user.name : "-"}
                </td>

                <td style={cell}>{booking.pickupLocation}</td>

                <td style={cell}>{booking.dropLocation}</td>

                <td style={cell}>{booking.bookingDate || "-"}</td>

                <td style={cell}>{booking.bookingTime || "-"}</td>

                <td style={cell}>₹{booking.fare}</td>

                <td style={cell}>{booking.status}</td>

                <td style={cell}>
                  {booking.status === "Pending" && (
                    <>
                      <button
                        style={button}
                        onClick={() =>
                          updateStatus(booking._id, "accept")
                        }
                      >
                        Accept
                      </button>

                      <button
                        style={{
                          ...button,
                          background: "red",
                          marginLeft: "8px",
                        }}
                        onClick={() =>
                          updateStatus(booking._id, "reject")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {booking.status === "Accepted" && (
                    <button
                      style={{
                        ...button,
                        background: "green",
                      }}
                      onClick={() =>
                        updateStatus(booking._id, "start")
                      }
                    >
                      Start Ride
                    </button>
                  )}

                  {booking.status === "Ride Started" && (
                    <button
                      style={{
                        ...button,
                        background: "#444",
                      }}
                      onClick={() =>
                        updateStatus(booking._id, "complete")
                      }
                    >
                      Complete Ride
                    </button>
                  )}

                  {booking.status === "Completed" && (
                    <span
                      style={{
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      ✅ Ride Completed
                    </span>
                  )}

                  {booking.status === "Rejected" && (
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      ❌ Ride Rejected
                    </span>
                  )}

                  {booking.status === "Cancelled" && (
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      ❌ Cancelled by User
                    </span>
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

const button = {
  background: "#f4b400",
  color: "white",
  border: "none",
  padding: "8px 12px",
  cursor: "pointer",
  borderRadius: "5px",
};

export default DriverBookings;