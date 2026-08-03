import { Link } from "react-router-dom";

function CabCard({ id, image, model, type, number, driver, price }) {  return (
    <div
      style={{
        width: "250px",
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px lightgray",
        textAlign: "center",
      }}
    >
      <img
        src={image}
        alt={model}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <h3>{model}</h3>

      <p><b>Type:</b> {type}</p>
      <p><b>Car No:</b> {number}</p>
      <p><b>Driver:</b> {driver}</p>
      <p><b>Price:</b> ₹{price}</p>

      <Link to={`/bookcab/${id}`}>
        <button
          style={{
            width: "100%",
            padding: "10px",
            background: "#f4b400",
            border: "none",
            marginTop: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Book Cab
        </button>
      </Link>
    </div>
  );
}

export default CabCard;