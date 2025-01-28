import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookingPage from "./pages/BookingPage";
import LandingPage from "./pages/LandingPage";
import MyBookings from "./pages/MyBookings";
import AdminPage from "./pages/admin/AdminPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminRoomPage from "./pages/admin/AdminRoomPage";
import AdminBookingsPage from "./pages/admin/AdminBookingsPage";
import ProfilePage from "./pages/ProfilePage";

//import "dotenv/config";
//BASE_URL = process.env.REACT_APP_API_URL;
//axios.defaults.baseURL = BASE_URL;
axios.defaults.baseURL = " http://127.0.0.1:6066";
function App() {
  //console.log(process.env.REACT_APP_API_URL);
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/:roomId" excat element={<BookingPage />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<AdminUserPage />} />
        <Route path="/admin/bookings" element={<AdminBookingsPage />} />
        <Route path="/admin/rooms" element={<AdminRoomPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>

      <footer className="bg-primary text-white text-center p-4 h-25 w-full">
        &copy; 2024 Wasan Rooms
      </footer>
    </>
  );
}

export default App;
