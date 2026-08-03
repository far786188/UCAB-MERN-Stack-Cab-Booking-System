import UNav from "../components/UNav";
import { Link } from "react-router-dom";

function Uhome() {
  return (
    <>
      <UNav />

      <div
        style={{
          textAlign: "center",
          padding: "60px",
          background: "#fff7d6",
          minHeight: "100vh",
        }}
      >
        <h1>Welcome to UCab</h1>

        <p
          style={{
            marginTop: "10px",
            marginBottom: "40px",
          }}
        >
          Book your cab quickly and safely.
        </p>

        <Link to="/cabs">
          <button style={buttonStyle}>
            View Available Cabs
          </button>
        </Link>

        <br />
        <br />

        <Link to="/mybookings">
          <button style={buttonStyle}>
            My Bookings
          </button>
        </Link>
      </div>
    </>
  );
}

const buttonStyle = {
  width: "220px",
  padding: "12px",
  background: "#f4b400",
  border: "none",
  borderRadius: "5px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Uhome;