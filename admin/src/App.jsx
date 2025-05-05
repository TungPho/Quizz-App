import React from "react";
import SideBar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import TeacherList from "./pages/Teachers";
import StudentList from "./pages/Students";
import UserList from "./pages/Users";
import AdminLogin from "./pages/Login";
import ProtectedLayout from "./components/ProtectedLayout";
const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/" element={<AdminLogin />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/teachers" element={<TeacherList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
