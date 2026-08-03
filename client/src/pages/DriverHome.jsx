import DNav from "../components/DNav";

function DriverHome() {
  const driver = JSON.parse(localStorage.getItem("driver"));

  return (
    <>
      <DNav />

      <div
        style={{
          background: "#fff7d6",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        <h1>Welcome Driver</h1>

        <h2 style={{ marginTop: "20px" }}>
          {driver ? driver.name : "Driver"}
        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px",
              width: "220px",
              borderRadius: "10px",
            }}
          >
            <h3>Pending Bookings</h3>
            <h1>0</h1>
          </div>

          <div
            style={{
              background: "white",
              padding: "25px",
              width: "220px",
              borderRadius: "10px",
            }}
          >
            <h3>Completed Rides</h3>
            <h1>0</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverHome;