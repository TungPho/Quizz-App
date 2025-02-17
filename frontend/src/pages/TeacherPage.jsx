import { useContext } from "react";
import HomeNavBar from "../components/HomeNavBar";
import SideBar from "../components/SideBar";
import { QuizzContext } from "../context/ContextProvider";
import Library from "../components/Library";

const TeacherPage = () => {
  const { state } = useContext(QuizzContext);
  return (
    <div>
      <HomeNavBar />
      <SideBar />
      <div className="main_content">
        {state === "normal" ? (
          "Teacher Page"
        ) : state === "library" ? (
          <Library />
        ) : state === "testHistory" ? (
          "Test History"
        ) : state === "myClasses" ? (
          "myClasses"
        ) : (
          "Default"
        )}
      </div>
    </div>
  );
};

export default TeacherPage;
