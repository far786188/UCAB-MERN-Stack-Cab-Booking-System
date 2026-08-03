import { useEffect, useState } from "react";
import axios from "axios";

import UNav from "../components/UNav";
import CabCard from "../components/CabCard";

function Cabs() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCabs();
  }, []);

  const fetchCabs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/cabs/all"
      );

      setCars(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load cabs");
    }
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
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Available Cabs
        </h1>

        <div
          style={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {cars.map((car) => (
            <CabCard
              key={car._id}
              id={car._id}
              image={
                car.image
                  ? `http://localhost:8000/uploads/${car.image}`
                  : "https://via.placeholder.com/250x150"
              }
              model={car.carName}
              type={car.carType}
              number={car.carNumber}
              driver={car.driver?.name || "Driver"}
              price={car.pricePerKm}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Cabs;