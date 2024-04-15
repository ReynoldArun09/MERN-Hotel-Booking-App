import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Homepage from "./pages/Homepage/Homepage";
import Loginpage from "./pages/Authpage/Loginpage";
import Resetpage from "./pages/Authpage/Resetpage";
import Registerpage from "./pages/Authpage/Registerpage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<Loginpage/>} />
        <Route path="/register" element={<Registerpage/>} />
        <Route path="/reset" element={<Resetpage />} />
      </Route>
    </Routes>
  );
}
