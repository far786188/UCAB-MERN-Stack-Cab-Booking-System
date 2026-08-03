import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ANav from "../components/ANav";

function ACabEdit() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [carName, setCarName] = useState("");
  const [carType, setCarType] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [seats, setSeats] = useState("");
  const [pricePerKm, setPricePerKm] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchCab();
  }, []);

  const fetchCab = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8000/api/cabs/all"
      );

      const cab = res.data.find((c) => c._id === id);

      if (cab) {
        setCarName(cab.carName);
        setCarType(cab.carType);
        setCarNumber(cab.carNumber);
        setSeats(cab.seats);
        setPricePerKm(cab.pricePerKm);
      }

    } catch (err) {
      console.log(err);
      alert("Unable to load cab");
    }
  };

  const updateCab = async () => {

    try {

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("carName", carName);
      formData.append("carType", carType);
      formData.append("carNumber", carNumber);
      formData.append("seats", seats);
      formData.append("pricePerKm", pricePerKm);

      if (image) {
        formData.append("image", image);
      }

      await axios.put(
        `http://localhost:8000/api/cabs/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Cab Updated Successfully");

      navigate("/admin/cabs");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Update Failed");
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
            width: "430px",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 0 10px lightgray",
          }}
        >
          <h2>Edit Cab</h2>

          <input
            type="text"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            placeholder="Car Model"
            style={inputStyle}
          />

          <input
            type="text"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            placeholder="Car Type"
            style={inputStyle}
          />

          <input
            type="text"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            placeholder="Car Number"
            style={inputStyle}
          />

          <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            placeholder="Seats"
            style={inputStyle}
          />

          <input
            type="number"
            value={pricePerKm}
            onChange={(e) => setPricePerKm(e.target.value)}
            placeholder="Price Per KM"
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
                background: "#f5f5f5",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{
                width: "66%",
                padding: "9px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />

          </div>

          <button
            style={buttonStyle}
            onClick={updateCab}
          >
            Update Cab
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

export default ACabEdit;