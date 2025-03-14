import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import CreateQuestion from "./pages/CreateQuestion";
import TestEdit from "./pages/TestEdit";
import ClassDetails from "./pages/ClassDetails";
import ScrollToTop from "./utils/ScrollToTop";
import Room from "./pages/Room";
import MainExam from "./pages/MainExam";
import Library from "./components/Library";
import MyClasses from "./pages/MyClasses";
import TestHistory from "./pages/TestHistory";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ProtectedLayout from "./utils/ProtectedLayout";
import ResetPassword from "./components/ResetPassword";
import NewSideBar from "./components/NewSideBar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/* Routes không cần đăng nhập */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password/:id/:token" element={<ResetPassword />} />
        <Route path="/test" element={<NewSideBar />} />
        {/* Routes cần đăng nhập, bọc trong ProtectedLayout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/library" element={<Library />} />
          <Route path="/home/my_classes" element={<MyClasses />} />
          <Route path="/home/test_history" element={<TestHistory />} />
          <Route path="/home/explore" element={<Explore />} />
          <Route path="/tests/:testId" element={<TestEdit />} />
          <Route path="/class/:classId" element={<ClassDetails />} />
          <Route path="/room/:roomID" element={<Room />} />
          <Route path="/my_profile" element={<Profile />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/main_exam" element={<MainExam />} />

          <Route path="/create-question" element={<CreateQuestion />} />
          <Route path="/create-question/:testId" element={<CreateQuestion />} />
          <Route
            path="/update-question/:questionId/:testId"
            element={<CreateQuestion />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
