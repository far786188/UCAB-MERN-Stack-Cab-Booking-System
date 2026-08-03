import { Link } from "react-router-dom";
import UNav from "../components/UNav";

function Home() {
  return (
    <>
      <UNav />

      <div
        style={{
          textAlign: "center",
          marginTop: "70px",
        }}
      >
        <h1>Your Ride, Your Way</h1>

        <p>
          Reliable. Fast. Affordable. Book cabs anytime,
          anywhere.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/744/744465.png"
          width="300"
          alt="cab"
        />

        <br />
        <br />

        <Link to="/login">
          <button
            style={{
              padding: "12px 25px",
              background: "#f4b400",
              border: "none",
              cursor: "pointer",
            }}
          >
            Explore Services
          </button>
        </Link>
      </div>
    </>
  );
}

export default Home;