import { useState, useEffect } from "react";
import axios from "axios";
import ANav from "../components/ANav";

function AddCar() {
  const [carName, setCarName] = useState("");
  const [carType, setCarType] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [driver, setDriver] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [seats, setSeats] = useState("");
  const [pricePerKm, setPricePerKm] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/drivers/all"
      );

      setDrivers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addCar = async () => {
    try {
      const formData = new FormData();

      formData.append("driver", driver);
      formData.append("carName", carName);
      formData.append("carType", carType);
      formData.append("carNumber", carNumber);
      formData.append("seats", seats);
      formData.append("pricePerKm", pricePerKm);
      formData.append("image", image);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8000/api/cabs/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      setCarName("");
      setCarType("");
      setCarNumber("");
      setDriver("");
      setSeats("");
      setPricePerKm("");
      setImage(null);

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message || "Failed to Add Car"
      );
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
          paddingTop: "40px",
        }}
      >
        <div
          style={{
            width: "420px",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <h2>Add New Car</h2>

          <input
            type="text"
            placeholder="Car Model"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Car Type"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Car Number"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            style={inputStyle}
          />

          <select
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Driver</option>

            {drivers.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Seats"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Price per KM"
            value={pricePerKm}
            onChange={(e) => setPricePerKm(e.target.value)}
            style={inputStyle}
          />

          <div style={{ marginTop: "12px" }}>
            <input
              type="text"
              value="Car Image"
              readOnly
              style={{
                width: "30%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginRight: "10px",
                background: "#f5f5f5",
                fontWeight: "bold",
                boxSizing: "border-box",
              }}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{
                width: "67%",
                padding: "9px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            style={buttonStyle}
            onClick={addCar}
          >
            Add Car
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

export default AddCar;