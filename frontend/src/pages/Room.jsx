import { useContext, useEffect } from "react";
import { QuizzContext } from "../context/ContextProvider";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Room = () => {
  // nhớ lấy danh sách học sinh theo room number!
  const { roomID } = useParams();
  const { socket } = useContext(QuizzContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    // emit an event to get students in the room
    socket.emit("getStudentsByRoom", roomID);
    // if the server returns data, take it
    socket.on("studentData", (data) => {
      console.log(data);
      setData(data);
    });
    return () => {
      socket.off("getStudentsByRoom");
      socket.off("studentData");
    };
  }, [roomID, socket]);
  return (
    <div>
      <div>Student List</div>
      {data.map((student, index) => {
        // exclude the teacher
        if (student.teacher_id) return;
        return (
          <div key={index}>
            <p>Name : {student.name}</p>
            <p>Student ID : {student.student_id}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Room;
