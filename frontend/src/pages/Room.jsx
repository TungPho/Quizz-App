import { useContext, useEffect } from "react";
import { QuizzContext } from "../context/ContextProvider";
import { useParams } from "react-router-dom";
import { useState } from "react";
import io from "socket.io-client";

const Room = () => {
  // nhớ lấy danh sách học sinh theo room number!
  const { roomID } = useParams();
  const userID = sessionStorage.getItem("userID");
  const role = sessionStorage.getItem("role");
  const { socket, setSocket } = useContext(QuizzContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    // emit an event to get students in the room
    socket.emit("getRoomById", roomID);
    // if the server returns data, take it
    socket.on("studentData", (data) => {
      console.log(data);
      setData(data);
    });
    return () => {
      socket.off("studentData");
      socket.off("getRoomById");
    };
  }, [roomID, socket]);

  // server sẽ nhận :)) yên tâm
  useEffect(() => {
    setSocket(
      io("ws://localhost:3000", {
        query: { userId: userID, role }, // Gửi userId và role khi kết nối
      })
    );
  }, [role, setSocket, userID]);
  return (
    <div>
      <div>Student List</div>
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
            <div className="grid grid-cols-6  border-r-black border-t-black border-l-black border bg-white font-semibold text-center p-3 rounded-t-md w-2/3">
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
  );
};

export default Room;
