import { useContext } from "react";
import { QuizzContext } from "../context/ContextProvider";
import HomeNavBar from "../components/HomeNavBar";
import SideBar from "../components/SideBar";

const TeacherPage = () => {
  const { createState } = useContext(QuizzContext);
  return (
    <div>
      <HomeNavBar />
      <SideBar />
      <div className="main_content">
        <div>
          {
            createState === "normal"
              ? "Student page"
              : createState === "create a class"
              ? "Create class"
              : createState === "create a test"
              ? "Create test"
              : "Student page" // Mặc định nếu state không khớp
          }
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
