import { useLocation } from "react-router-dom";
import StudentPage from "../StudentPage/StudentPage";
import TeacherPage from "../TeacherPage/TeacherPage";

const Home = () => {
  const location = useLocation();
  const role = location.state.role;
  return <div> {role === "teacher" ? <TeacherPage /> : <StudentPage />}</div>;
};

export default Home;
