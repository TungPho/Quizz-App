import { useContext } from "react";
import { MessageSquare, Users, Plus } from "lucide-react";
import HomeNavBar from "../components/HomeNavBar";
import { QuizzContext } from "../context/ContextProvider";
import SideBar from "../components/SideBar";

const Explore = () => {
  const { collapsed } = useContext(QuizzContext);
  // const userID = localStorage.getItem("userID");

  // Sample rooms data
  const rooms = [
    { id: 1, name: "Math Room", students: 24, active: true },
    { id: 2, name: "Science Lab", students: 18, active: true },
  ];

  // fetch ExamProgress when logged in

  return (
    <div>
      <HomeNavBar />
      <SideBar />
      <div
        className={`transition-all duration-300 ease-in-out p-6 ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Main content area */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Rooms</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600 transition-colors">
                <Plus className="w-4 h-4" />
                <span>New Room</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
