import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import CreateQuestion from "./pages/CreateQuestion";
import TestEdit from "./pages/TestEdit";
import ClassDetails from "./pages/ClassDetails";
import ScrollToTop from "./utils/ScrollToTop";
import Room from "./pages/Room";
import MainExam from "./pages/MainExam";

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-question" element={<CreateQuestion />} />
        <Route path="/create-question/:testId" element={<CreateQuestion />} />
        <Route
          path="/update-question/:questionId/:testId"
          element={<CreateQuestion />}
        />
        <Route path="/tests/:testId" element={<TestEdit />} />
        <Route path="/class/:classId" element={<ClassDetails />} />
        <Route path="/room/:roomID" element={<Room />} />
        <Route path="/main_exam" element={<MainExam />} />
      </Routes>
    </div>
  );
};

export default App;
