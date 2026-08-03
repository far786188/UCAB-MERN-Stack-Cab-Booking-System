  import { BrowserRouter, Routes, Route } from "react-router-dom";

  import Home from "./pages/Home";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import Uhome from "./pages/Uhome";
  import Cabs from "./pages/Cabs";
  import BookCab from "./pages/BookCab";
  import MyBookings from "./pages/MyBookings";

  import ALogin from "./pages/ALogin";
  import ARegister from "./pages/ARegister";
  import AHome from "./pages/AHome";
  import Users from "./pages/Users";
  import UserEdit from "./pages/UserEdit";
  import ACabs from "./pages/ACabs";
  import ACabEdit from "./pages/ACabEdit";
  import AddCar from "./pages/AddCar";
  import Bookings from "./pages/Bookings";

  import DriverRegister from "./pages/DriverRegister";
  import DriverLogin from "./pages/DriverLogin";
  import DriverHome from "./pages/DriverHome";
  import DriverBookings from "./pages/DriverBookings";

  function App() {
    return (
      <BrowserRouter>
        <Routes>

          {/* User */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/uhome" element={<Uhome />} />
          <Route path="/cabs" element={<Cabs />} />
          <Route path="/bookcab/:id" element={<BookCab />} />
          <Route path="/mybookings" element={<MyBookings />} />

          {/* Admin */}
          <Route path="/admin/login" element={<ALogin />} />
          <Route path="/admin/register" element={<ARegister />} />
          <Route path="/admin/home" element={<AHome />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/useredit/:id" element={<UserEdit />} />
          <Route path="/admin/cabs" element={<ACabs />} />
          <Route path="/admin/cabedit/:id" element={<ACabEdit />} />
          <Route path="/admin/addcar" element={<AddCar />} />
          <Route path="/admin/bookings" element={<Bookings />} />

          {/* Driver */}
          <Route path="/driver/register" element={<DriverRegister />} />
          <Route path="/driver/login" element={<DriverLogin />} />
          <Route path="/driver/home" element={<DriverHome />} />
          <Route path="/driver/bookings" element={<DriverBookings />} />
          

        </Routes>
      </BrowserRouter>
    );
  }

  export default App;