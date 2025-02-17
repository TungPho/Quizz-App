import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import CreateQuestion from "./pages/CreateQuestion";
import TestEdit from "./pages/TestEdit";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-question" element={<CreateQuestion />} />
        <Route path="/tests/:testId" element={<TestEdit />} />
      </Routes>
    </div>
  );
};

export default App;
