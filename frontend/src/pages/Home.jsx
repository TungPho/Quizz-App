import TeacherPage from "./TeacherPage";
import StudentPage from "./StudentPage";

const Home = () => {
  // you should take role and user id, token from context when login

  const role = localStorage.getItem("role");
  return <div> {role === "teacher" ? <TeacherPage /> : <StudentPage />}</div>;
};

export default Home;
