import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/SignUpAndLogin/SignUp";
import Login from "../pages/SignUpAndLogin/Login";
import LandingPage from "../pages/LandingPage/LandingPage";
import Home from "../pages/Home/Home";
import HomeNavBar from "../components/HomeNavBar/HomeNavBar";
const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<HomeNavBar />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
