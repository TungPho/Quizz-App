import { useContext, useEffect } from "react";
import { QuizzContext } from "../context/ContextProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

import io from "socket.io-client";
import RoomNotExist from "../components/RoomNotExist";

const Room = () => {
  // nhớ lấy danh sách học sinh theo room number!
  const { roomID } = useParams();
  const userID = localStorage.getItem("userID");
  const role = localStorage.getItem("role");
  const { socket, setSocket } = useContext(QuizzContext);
  const [data, setData] = useState([]);
  const { classID } = useLocation().state;
  console.log("ClassID", classID);
  const [isRoomExist, setIsRoomExist] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // emit an event to get students in the room
    socket.emit("getRoomById", roomID);
    socket.emit("checkRoomExist", roomID);

    // if the server returns data, take it
    socket.on("studentData", (data) => {
      setData(data);
    });
    socket.on("isRoomExist", (roomExist) => {
      console.log(roomExist ? "Exist" : "Room not exist");
      setIsRoomExist(roomExist);
    });
    return () => {
      socket.off("studentData");
      socket.off("getRoomById");
    };
  }, [roomID, socket]);

  useEffect(() => {
    setSocket(
      io("ws://localhost:3000", {
        query: { userId: userID, role }, // Gửi userId và role khi kết nối
      })
    );
  }, [role, setSocket, userID]);
  return isRoomExist ? (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex items-center">
        <button
          onClick={() => {
            navigate(`/class/${classID}`);
          }}
          className="text-3xl mr-3 hover:bg-slate-300 p-2"
        >
          <IoIosArrowRoundBack />
        </button>
        <div>Room: {roomID}</div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-6  border-r-black border-t-black border-l-black border bg-white font-semibold text-center p-3 rounded-t-md w-2/3">
          <div className="col-span-1">Student Name</div>
          <div className="col-span-1">Student ID</div>
          <div className="col-span-1">State</div>
          <div className="col-span-1 flex justify-center">Current Question</div>
          <div className="col-span-1 flex justify-center">
            Number of Violates
          </div>

          <div className="col-span-1 flex justify-center">Status</div>
        </div>
      </div>
      {data.map((student, index) => {
        // exclude the teacher
        if (student.teacher_id) return;
        return (
          <div key={index} className="flex justify-center">
            <div className="grid grid-cols-6  border-r-black border-t-black border-l-black border-b-black border bg-white font-semibold text-center p-3  w-2/3">
              <div className="col-span-1">{student.name}</div>
              <div className="col-span-1">{student.student_id}</div>
              <div className="col-span-1">Joined</div>
              <div className="col-span-1 flex justify-center">Question 4</div>
              <div className="col-span-1 flex justify-center">0 Times</div>
              <div className="col-span-1 flex justify-center">
                Not Submitted
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <RoomNotExist />
  );
};

export default Room;
