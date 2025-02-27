import TeacherPage from "./TeacherPage";
import StudentPage from "./StudentPage";

const Home = () => {
  // you should take role and user id, token from context when login

  const role = sessionStorage.getItem("role");
  console.log(role);
  return <div> {role === "teacher" ? <TeacherPage /> : <StudentPage />}</div>;
};

export default Home;
