import { useContext } from "react";
import { MessageSquare, Users, Plus } from "lucide-react";
import HomeNavBar from "../components/HomeNavBar";
import { QuizzContext } from "../context/ContextProvider";
import SideBar from "../components/SideBar";

const Explore = () => {
  const { collapsed } = useContext(QuizzContext);

  // Sample rooms data
  const rooms = [
    { id: 1, name: "Math Room", students: 24, active: true },
    { id: 2, name: "Science Lab", students: 18, active: true },
    { id: 3, name: "Reading Circle", students: 20, active: false },
    { id: 4, name: "Art Studio", students: 15, active: true },
    { id: 5, name: "History Class", students: 22, active: true },
    { id: 6, name: "Coding Club", students: 12, active: false },
  ];

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

          {/* Rooms grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-green-50 rounded-lg overflow-hidden border border-green-100 hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {room.name}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{room.students} students</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        room.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {room.active ? "Active" : "Inactive"}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                      Last active: Today
                    </div>
                    <button className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                      Enter Room
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Create room card */}
            <div className="bg-green-50 rounded-lg border-2 border-dashed border-green-200 flex items-center justify-center p-8 hover:bg-green-100 transition-colors cursor-pointer">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-3">
                  <Plus className="w-7 h-7" />
                </div>
                <p className="font-medium text-green-700">Create New Room</p>
                <p className="text-sm text-green-600 mt-1">
                  Set up a new space for your class
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
