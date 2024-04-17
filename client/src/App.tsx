import { Navigate, Route, Routes } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import Layout from "./Layout/Layout";
import Homepage from "./pages/Homepage/Homepage";
import Loginpage from "./pages/Authpage/Loginpage";
import Resetpage from "./pages/Authpage/Resetpage";
import Registerpage from "./pages/Authpage/Registerpage";
import AddHotel from "./pages/Hotelpage/AddHotel";
import MyHotels from "./pages/Hotelpage/MyHotels";
import EditDetails from "./pages/Hotelpage/EditDetails";
import Detailspage from "./pages/Hotelpage/Detailspage";
import Searchpage from "./pages/Searchpage/Searchpage";
import Bookingpage from "./pages/Bookingpage/Bookingpage";
import MyBookingpage from "./pages/Bookingpage/MyBookingpage";


export default function App() {
  const {isLoggedIn} = useAppContext()
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/login" element={!isLoggedIn ? <Loginpage />: <Navigate to="/"/>} />
        <Route path="/register" element={!isLoggedIn ? <Registerpage />: <Navigate to="/"/>} />
        <Route path="/reset-password" element={!isLoggedIn ? <Resetpage />: <Navigate to="/"/>} />
        <Route path="/add-hotel" element={isLoggedIn ? <AddHotel />: <Navigate to="/"/>} />
        <Route path="/my-hotels" element={isLoggedIn ? <MyHotels />: <Navigate to="/"/>} />
        <Route path="my-bookings" element={isLoggedIn ? <MyBookingpage />: <Navigate to="/"/>} />
        <Route path="/edit-hotel/:hotelId" element={isLoggedIn ? <EditDetails />: <Navigate to="/"/>} />
        <Route path="/detail/:hotelId" element={<Detailspage />} />
        <Route path="/search" element={<Searchpage />} />
        <Route path="/hotel/:hotelId/booking" element={isLoggedIn ? <Bookingpage />: <Navigate to="/"/>} />
      </Route>
    </Routes>
  );
}
