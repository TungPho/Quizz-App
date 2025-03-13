import HomeNavBar from "../components/HomeNavBar";
import NewSideBar from "../components/NewSideBar";

const StudentPage = () => {
  return (
    <div>
      <HomeNavBar />
      <NewSideBar />
      <div className="main_content">Student Page</div>
    </div>
  );
};

export default StudentPage;
