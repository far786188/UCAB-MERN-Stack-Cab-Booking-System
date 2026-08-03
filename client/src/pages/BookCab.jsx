import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UNav from "../components/UNav";

function BookCab() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [distance, setDistance] = useState("");
  const [fare, setFare] = useState(0);

  const calculateFare = () => {
    if (!distance) {
      alert("Enter Distance");
      return;
    }

    // Temporary calculation
    setFare(distance * 15);
  };

  const bookRide = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/bookings/book",
        {
          cab: id,
          pickupLocation,
          dropLocation,
          bookingDate,
          bookingTime,
          distance,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Ride Booked Successfully");

      navigate("/mybookings");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <>
      <UNav />

      <div
        style={{
          background: "#fff7d6",
          minHeight: "100vh",
          paddingTop: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "420px",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 0 10px lightgray",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Book a Ride
          </h2>

          <label>Pickup Location</label>

          <input
            type="text"
            value={pickupLocation}
            onChange={(e) =>
              setPickupLocation(e.target.value)
            }
            placeholder="Enter Pickup Location"
            style={inputStyle}
          />

          <label>Drop Location</label>

          <input
            type="text"
            value={dropLocation}
            onChange={(e) =>
              setDropLocation(e.target.value)
            }
            placeholder="Enter Drop Location"
            style={inputStyle}
          />
          <label>Booking Date</label>

          <input
            type="date"
            value={bookingDate}
            onChange={(e) =>
              setBookingDate(e.target.value)
            }
            style={inputStyle}
          />

          <label>Booking Time</label>

          <input
            type="time"
            value={bookingTime}
            onChange={(e) =>
              setBookingTime(e.target.value)
            }
            style={inputStyle}
          />

          <label>Distance (KM)</label>

          <input
            type="number"
            value={distance}
            onChange={(e) =>
              setDistance(e.target.value)
            }
            placeholder="Enter Distance"
            style={inputStyle}
          />

          <button
            style={yellowButton}
            onClick={calculateFare}
          >
            Calculate Fare
          </button>

          <h3
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Fare : ₹{fare}
          </h3>

          <button
            style={blackButton}
            onClick={bookRide}
          >
            Book Ride
          </button>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  marginBottom: "15px",
  boxSizing: "border-box",
};

const yellowButton = {
  width: "100%",
  padding: "10px",
  background: "#f4b400",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};

const blackButton = {
  width: "100%",
  padding: "10px",
  background: "#000",
  color: "#fff",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};

export default BookCab;