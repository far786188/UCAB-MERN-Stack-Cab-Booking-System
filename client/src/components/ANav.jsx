import { Link } from "react-router-dom";

function ANav() {
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
      <h2>UCab Admin</h2>

      <div>
        <Link to="/admin/home" style={linkStyle}>Dashboard</Link>

        <Link to="/admin/users" style={linkStyle}>Users</Link>

        <Link to="/admin/cabs" style={linkStyle}>Cabs</Link>

        <Link to="/admin/bookings" style={linkStyle}>Bookings</Link>

        <Link to="/admin/addcar" style={linkStyle}>Add Car</Link>

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

export default ANav;