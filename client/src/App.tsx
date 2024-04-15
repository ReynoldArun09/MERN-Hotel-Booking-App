import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Homepage from "./pages/Homepage/Homepage";
import Loginpage from "./pages/Authpage/Loginpage";
import Resetpage from "./pages/Authpage/Resetpage";
import Registerpage from "./pages/Authpage/Registerpage";
import { useAppContext } from "./context/AppContext";
import AddHotel from "./pages/Hotelpage/AddHotel";

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
      </Route>
    </Routes>
  );
}
