import { Link } from "react-router-dom";

function UNav() {
  return (
    <nav
      style={{
        background: "#f4b400",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>UCab App</h2>

      <div>
        <Link to="/uhome" style={linkStyle}>Home</Link>

        <Link to="/cabs" style={linkStyle}>Book Cab</Link>

        <Link to="/mybookings" style={linkStyle}>My Bookings</Link>

        <Link to="/" style={linkStyle}>Logout</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  marginLeft: "20px",
  textDecoration: "none",
  color: "black",
  fontWeight: "bold",
};

export default UNav;