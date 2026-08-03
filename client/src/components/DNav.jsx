import { Link, useNavigate } from "react-router-dom";

function DNav() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("driver");
    localStorage.removeItem("driverToken");
    navigate("/driver/login");
  };

  return (
    <nav
      style={{
        background: "#f4b400",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>🚖 UCAB Driver</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/driver/home" style={link}>
          Dashboard
        </Link>

        <Link to="/driver/bookings" style={link}>
          Bookings
        </Link>

        <button
          onClick={logout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 15px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const link = {
  textDecoration: "none",
  color: "black",
  fontWeight: "bold",
};

export default DNav;