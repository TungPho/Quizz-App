import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { QuizzContext } from "../context/ContextProvider";
import { IoIosArrowRoundBack, IoMdClose } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import { BsPeople, BsDoorOpen } from "react-icons/bs";
import { RiTestTubeFill } from "react-icons/ri";
import NotificationComponent from "../components/NotificationComponent";
import io from "socket.io-client";

import axios from "axios";
import { toast } from "react-toastify";
const TeacherClassDetails = () => {
  const { socket, setState, setSocket } = useContext(QuizzContext);
  const { classId } = useParams();
  const userID = localStorage.getItem("userID");
  const role = localStorage.getItem("role");

  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  const [isOpenAddStudent, setIsOpenAddStudent] = useState(false);
  const [roomCode, setRoomCode] = useState();
  const [classes, setClass] = useState(null);
  const [className, setClassName] = useState("");
  const [tests, setTests] = useState([]);
  const [activeRooms, setActiveRooms] = useState([]);
  const [studentID, setStudentID] = useState("");
  const [selectedTest, setSelectedTest] = useState("");

  const [selectedTestName, setSelectedTestName] = useState("");
  const [selectedTestDurtaion, setSelectedTestDurtaion] = useState(0);

  const [studentLength, setStudentLength] = useState(0);
  const BACK_END_LOCAL_URL = import.meta.env.VITE_LOCAL_API_CALL_URL;

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("acepted", () => {
      toast.success("Student accepted to join class");
    });
  }, [socket]);

  useEffect(() => {
    setSocket(
      io("ws://localhost:3000", {
        query: { userId: userID, role }, // Gửi userId và role khi kết nối
      })
    );
  }, [role, setSocket, userID]);
  // Generate className + 6 digits code
  const generateRoomCode = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    let result = "";
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      result += numbers[randomIndex];
    }
    setRoomCode(classes.name + "-" + result);
  };
  const createRoom = () => {
    socket.emit(
      "createRoom",
      roomCode,
      userID,
      selectedTest,
      classId,
      selectedTestName,
      selectedTestDurtaion
    );
  };

  useEffect(() => {
    const fetchClass = async () => {
      const req = await fetch(
        `http://localhost:3000/api/v1/classes/${classId}`
      );
      const res = await req.json();
      setClass(res.metadata);

      setStudentLength(res.metadata.students.length);
      setClassName(res.metadata.name);
    };

    const fetchTestByTeacherID = async () => {
      const req = await fetch(
        `http://localhost:3000/api/v1/tests-find/${userID}`
      );
      const res = await req.json();
      setTests(res.metadata.foundTests);
    };

    fetchClass();
    fetchTestByTeacherID();
  }, [classId, userID]);

  useEffect(() => {
    // Emit event to get room list by class name
    socket.emit("getRoomList", className);
  }, [className, socket]);

  useEffect(() => {
    // Event triggered when server sends back rooms
    socket.on("roomList", (rooms) => {
      setActiveRooms(rooms);
    });

    return () => {
      socket.off("roomList");
    };
  }, [socket]);

  const handleAddStudent = async () => {
    if (!studentID.trim()) {
      alert("Please enter a valid student ID");
      return;
    }
    // find Student first
    // const foundStudent = await axios.get("");
    // try {
    //   const req = await fetch(
    //     `http://localhost:3000/api/v1/classes/${classId}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         studentID: studentID,
    //       }),
    //     }
    //   );
    //   const res = await req.json();

    //   console.log(res);
    //   if (res.status !== "error") {
    //     setStudentLength((l) => l + 1);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    socket.emit("requestToJoinClass", classes, studentID);
  };

  const refreshRooms = () => {
    socket.emit("getRoomList", className);
  };

  const handleTestSelect = (e) => {
    const testId = e.target.value;
    setSelectedTest(testId);

    // Find the test name for displaying in the UI
    const selectedTestObj = tests.find((test) => test._id === testId);
    if (selectedTestObj) {
      setSelectedTestDurtaion(selectedTestObj.timeLimit);
      setSelectedTestName(selectedTestObj.title);
    }
  };

  const findTestById = (id) => {
    console.log(tests);
    for (let test of tests) {
      if (test._id === id) {
        return test.title;
      }
    }
    return "Default Test Title";
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-b-lg">
        <div className="flex items-center">
          <button
            onClick={() => {
              setState("myClasses");
              navigate("/home/my_classes");
            }}
            className="text-gray-600 hover:text-green-500 transition-colors p-2 rounded-full hover:bg-green-50 mr-3"
          >
            <IoIosArrowRoundBack className="text-3xl" />
          </button>
          <div>
            <h1 className="font-sans font-bold text-xl text-gray-800">
              {className}
            </h1>
            <p className="font-sans text-sm text-gray-500">Class Management</p>
          </div>
        </div>
        <div className="flex gap-3">
          <NotificationComponent />
          <button
            onClick={() => setIsOpenCreateRoom(true)}
            className="bg-green-400 hover:bg-green-500 text-white px-5 py-2 rounded-md shadow hover:shadow-lg transition-all font-medium flex items-center"
          >
            <BsDoorOpen className="mr-2" /> Create Room
          </button>
          <button
            onClick={() => setIsOpenAddStudent(true)}
            className="bg-white border border-green-400 text-green-500 hover:bg-green-50 px-5 py-2 rounded-md shadow hover:shadow-lg transition-all font-medium flex items-center"
          >
            <BsPeople className="mr-2" /> Add Student
          </button>
        </div>
      </div>

      {/* Active Rooms Section */}
      <div className="max-w-5xl mx-auto mt-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700">Active Rooms</h2>
          <button
            onClick={refreshRooms}
            className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 shadow transition-all flex items-center"
            title="Refresh room list"
          >
            <IoReload className="mr-1" /> Refresh
          </button>
        </div>

        {/* Card Style Room List */}
        {activeRooms.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-10 text-center">
            <div className="text-gray-400 text-6xl flex justify-center mb-4">
              <BsDoorOpen />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Active Rooms
            </h3>
            <p className="text-gray-500 mb-6">
              Create a new room to start a quiz session.
            </p>
            <button
              onClick={() => setIsOpenCreateRoom(true)}
              className="bg-green-400 hover:bg-green-500 text-white px-5 py-2 rounded-md shadow hover:shadow-lg transition-all font-medium"
            >
              Create Your First Room
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeRooms.map((room, index) => {
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                >
                  <div className="p-1 bg-green-400 text-white text-center text-xs font-semibold">
                    ACTIVE
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg text-gray-800">
                        {room[0]}
                      </h3>
                      <span className="flex items-center text-gray-600">
                        <BsPeople className="mr-1" />
                        <span className="font-semibold">
                          {/* So luong sinh vien tham gia */}
                          {room[1].length - 1}
                        </span>
                      </span>
                    </div>

                    <div className="flex flex-col text-gray-600 text-sm mb-4">
                      <div className="flex items-center mb-1">
                        <span className="font-semibold w-20">Class:</span>
                        <span>{className}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold w-20">Test:</span>
                        <span className="flex items-center">
                          <RiTestTubeFill className="mr-1 text-green-500" />
                          {findTestById(room[1][0].test_id) || "Selected Test"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => {
                          navigate(`/room/${room[0]}`, {
                            state: { classID: classId },
                          });
                        }}
                        className="text-green-500 hover:text-green-600 text-sm font-semibold flex items-center"
                      >
                        Enter Room →
                      </button>
                      <button
                        onClick={() => {
                          socket.emit("deleteRoom", room[0]);
                        }}
                        className="text-red-500 hover:text-green-600 text-sm font-semibold flex items-center"
                      >
                        Delete Room
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Room Modal */}
      {isOpenCreateRoom && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Create New Room
              </h3>
              <button
                onClick={() => setIsOpenCreateRoom(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <IoMdClose className="text-xl" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Code
                </label>
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <input
                    value={roomCode}
                    disabled
                    className="p-3 flex-1 focus:outline-none bg-gray-50"
                    type="text"
                    placeholder="Generated room code will appear here"
                  />
                  <button
                    onClick={generateRoomCode}
                    className="bg-green-400 hover:bg-green-500 text-white px-4 font-medium transition-colors"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Class Name</span>
                  <p className="font-medium">{className}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Teacher</span>
                  <p className="font-medium">Tung</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Test
                </label>
                <select
                  onChange={handleTestSelect}
                  className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select a Test</option>
                  {tests.map((test, index) => (
                    <option value={test._id} key={index}>
                      {test.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  onClick={() => setIsOpenCreateRoom(false)}
                  className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!selectedTest) {
                      alert("Please select a test");
                      return;
                    }
                    createRoom();
                    setIsOpenCreateRoom(false);
                  }}
                  className="px-5 py-2 bg-green-400 hover:bg-green-500 rounded-md font-medium text-white shadow hover:shadow-md transition-all"
                >
                  Create Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isOpenAddStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add Student</h3>
              <button
                onClick={() => setIsOpenAddStudent(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <IoMdClose className="text-xl" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student ID
                </label>
                <input
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  placeholder="Enter student ID"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  onClick={() => setIsOpenAddStudent(false)}
                  className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleAddStudent();
                    setIsOpenAddStudent(false);
                  }}
                  className="px-5 py-2 bg-green-400 hover:bg-green-500 rounded-md font-medium text-white shadow hover:shadow-md transition-all"
                >
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State for No Classes */}
      {classes && classes.students && classes.students.length === 0 && (
        <div className="max-w-5xl mx-auto mt-8 p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BsPeople className="text-green-500 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Students Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Add students to your class to get started.
            </p>
            <button
              onClick={() => setIsOpenAddStudent(true)}
              className="bg-green-400 hover:bg-green-500 text-white px-5 py-2 rounded-md shadow hover:shadow-lg transition-all font-medium"
            >
              Add Your First Student
            </button>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="max-w-5xl mx-auto mt-8 px-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-gray-500 text-sm mb-1">Total Tests</div>
            <div className="text-2xl font-bold text-gray-800">
              {tests.length}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-gray-500 text-sm mb-1">Active Rooms</div>
            <div className="text-2xl font-bold text-gray-800">
              {activeRooms.length}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-gray-500 text-sm mb-1">Total Students</div>
            <div className="text-2xl font-bold text-gray-800">
              {studentLength || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassDetails;
