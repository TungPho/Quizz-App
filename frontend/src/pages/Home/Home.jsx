import { useLocation } from "react-router-dom";
import TeacherPage from "../TeacherPage";
import StudentPage from "../StudentPage";

const Home = () => {
  const location = useLocation();
  const role = location.state.role;
  return <div> {role === "teacher" ? <TeacherPage /> : <StudentPage />}</div>;
};

export default Home;
