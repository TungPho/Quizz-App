import { useContext, useEffect } from "react";
import { QuizzContext } from "../context/ContextProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaClock } from "react-icons/fa";

import io from "socket.io-client";
import RoomNotExist from "../components/RoomNotExist";

const Room = () => {
  const { roomID } = useParams();
  const userID = localStorage.getItem("userID");
  const role = localStorage.getItem("role");
  const { socket, setSocket } = useContext(QuizzContext);
  const [data, setData] = useState([]);
  const { classID } = useLocation().state;
  const [isRoomExist, setIsRoomExist] = useState(true);
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  // test info
  const [testName, setTestname] = useState("");
  const [testDuration, setTestDuration] = useState(0);

  // Exam timing states
  const [examStarted, setExamStarted] = useState();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const fetchStudentList = async () => {
      const req = await fetch(
        `http://localhost:3000/api/v1/get_all_students/${classID}`
      );
      console.log(req);
      const res = await req.json();
      sessionStorage.setItem("student_list", JSON.stringify(res.metadata));
      setStudentList(res.metadata);
    };
    const sessionList = JSON.parse(sessionStorage.getItem("student_list"));
    if (sessionList) {
      setStudentList(sessionList);
    } else {
      fetchStudentList();
    }
  }, [classID]);

  useEffect(() => {
    socket.emit("getRoomById", roomID);
    socket.emit("checkRoomExist", roomID);

    socket.on("studentData", (studentData) => {
      setTestDuration(studentData[0].duration);
      setTestname(studentData[0].test_name);
      setData(studentData);
    });

    socket.on("isRoomExist", (roomExist) => {
      setIsRoomExist(roomExist);
    });
    return () => {
      socket.off("studentData");
      socket.off("getRoomById");
      socket.off("isRoomExist");
    };
  }, [roomID, socket, testDuration]);

  // Timer effect to update remaining time
  useEffect(() => {
    let interval;

    if (examStarted && endTime) {
      interval = setInterval(() => {
        const now = new Date();
        const remaining = endTime - now;

        if (remaining <= 0) {
          setRemainingTime("Exam ended");
          clearInterval(interval);
        } else {
          const minutes = Math.floor(remaining / 60000);
          const seconds = Math.floor((remaining % 60000) / 1000);
          setRemainingTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [examStarted, endTime]);

  useEffect(() => {
    setSocket(
      io("ws://localhost:3000", {
        query: { userId: userID, role },
      })
    );
  }, [role, setSocket, userID]);

  const handleForceSubmit = (studentId) => {
    socket.emit("requestForceSubmit", studentId);
  };

  const handleStartExam = () => {
    const now = new Date();
    setStartTime(now);
    setEndTime(new Date(now.getTime() + testDuration * 60000));
    setExamStarted(true);
    sessionStorage.setItem("examStarted", true);

    // Emit the start exam event with the current time
    socket.emit("requestStartExam", roomID, now.toISOString());
  };

  // Function to format date to display time
  const formatTime = (date) => {
    return date
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";
  };

  return isRoomExist ? (
    <div className="bg-green-400 min-h-screen p-4">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <button
              onClick={() => {
                navigate(`/teacher_class/${classID}`);
              }}
              className="text-3xl mr-3 hover:bg-green-100 p-2 rounded-full transition-colors"
            >
              <IoIosArrowRoundBack />
            </button>
            <div>
              <h1 className="text-xl font-bold">Room: {roomID}</h1>
              <p className="text-gray-600">
                {data.length - 1} / {studentList.length} Students
              </p>
            </div>
          </div>

          <div className="flex flex-col md:items-end">
            <p className="font-medium">
              Test: <span className="font-bold">{testName}</span>
            </p>
            <p className="font-medium">
              Duration:{" "}
              <span className="font-bold">{testDuration} minutes</span>
            </p>

            {!examStarted ? (
              <button
                onClick={handleStartExam}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors font-medium"
              >
                Start Exam
              </button>
            ) : (
              <div className="mt-2 p-3 bg-green-100 rounded-md">
                <div className="flex items-center text-green-800 font-medium mb-1">
                  <FaClock className="mr-2" />
                  Remaining: {remainingTime}
                </div>
                <div className="text-sm text-green-700">
                  Started: {formatTime(startTime)} • Ends: {formatTime(endTime)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student List Section */}
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg shadow-md">
          {/* Table Header */}
          <div className="grid grid-cols-7 font-semibold text-center p-3 border-b">
            <div className="col-span-1">Name</div>
            <div className="col-span-1">ID</div>
            <div className="col-span-1">State</div>
            <div className="col-span-1">Question</div>
            <div className="col-span-1">Violations</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Action</div>
          </div>

          {/* Table Body */}
          {data.map((student, index) => {
            // exclude the teacher
            if (student.teacher_id) return null;
            return (
              <div
                key={index}
                className="grid grid-cols-7 border-b text-center p-3 hover:bg-green-50"
              >
                <div className="col-span-1 truncate">{student.name}</div>
                <div className="col-span-1 truncate">{student.student_id}</div>
                <div
                  className={`col-span-1 ${
                    student.state === "joined"
                      ? "text-green-500"
                      : "text-red-500"
                  } font-medium`}
                >
                  {student.state}
                </div>
                <div className="col-span-1">{student.current_question}</div>
                <div className="col-span-1 text-red-500 font-medium">
                  {student.number_of_violates} times
                </div>
                <div
                  className={`col-span-1 ${
                    student.status === "Not Submitted"
                      ? "text-red-500"
                      : "text-green-500"
                  } font-medium`}
                >
                  {student.status}
                </div>
                <div className="col-span-1">
                  <button
                    onClick={() => handleForceSubmit(student.student_id_db)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm transition-colors"
                  >
                    Force Submit
                  </button>
                </div>
              </div>
            );
          })}

          {/* Empty state if no students */}
          {(!data.length || (data.length === 1 && data[0].teacher_id)) && (
            <div className="p-8 text-center text-gray-500">
              No students have joined this room yet.
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <RoomNotExist />
  );
};

export default Room;
