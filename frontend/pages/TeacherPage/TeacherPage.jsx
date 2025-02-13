import { useContext } from "react";
import HomeNavBar from "../../components/HomeNavBar/HomeNavBar";
import SideBar from "../../components/SideBar/SideBar";
import { QuizzContext } from "../../context/ContextProvider";

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
