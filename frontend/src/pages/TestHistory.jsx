import { useContext } from "react";
import HomeNavBar from "../components/HomeNavBar";
import SideBar from "../components/SideBar";
import { QuizzContext } from "../context/ContextProvider";

const TestHistory = () => {
  const { collapsed } = useContext(QuizzContext);
  return (
    <div>
      <HomeNavBar />
      <SideBar />
      <div
        className={`transition-all duration-300 ease-in-out p-6 ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        TestHistory
      </div>
    </div>
  );
};

export default TestHistory;
