import { useContext, useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { QuizzContext } from "../context/ContextProvider";

const HomeNavBar = () => {
  const role = sessionStorage.getItem("role");
  const [isOpenEnterCode, setIsOpenEnterCode] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentID, setStudentID] = useState("");
  const userID = sessionStorage.getItem("userID");
  const { socket } = useContext(QuizzContext);
  const handleJoinRoom = () => {
    socket.emit("joinRoom", roomCode, {
      name: studentName,
      student_id_db: userID,
      student_id: studentID,
    });
  };

  return (
    <div>
      <div className="flex flex-row justify-end items-center h-[50px] shadow-lg ml-[15%] sticky top-0 bg-white">
        <div
          className={`cursor-pointer hover:bg-slate-200 border border-gray-500 self-center p-2 text-[13px] mr-[10px]`}
        >
          <CiBellOn className="text-xl" />
        </div>
        <div
          onClick={() => {
            setIsOpenEnterCode(true);
          }}
          className={`${
            role !== "teacher" ? "" : "hidden"
          } cursor-pointer hover:bg-slate-200 border border-gray-500 self-center p-2 text-[13px] mr-[10px]`}
        >
          Enter Code
        </div>
        <div className="w-[6%] cursor-pointer hover:bg-slate-200 border flex justify-between  items-center border-gray-500 self-center  text-[13px] mr-[10px]  border-solid rounded-3xl p-1">
          <img className="w-1/2 rounded-3xl" src="/images/avatar.png" alt="" />
          <IoMdArrowDropdown className="text-xl" />
        </div>
      </div>

      <div
        className={`flex justify-center ${isOpenEnterCode ? "" : "hidden"} `}
      >
        <div className="absolute border border-black rounded-sm p-4 w-1/5">
          <button
            onClick={() => {
              setIsOpenEnterCode(false);
            }}
            className="text-2xl border border-black rounded-3xl hover:bg-slate-200"
          >
            <IoMdClose />
          </button>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="room_code">
              Enter room code:
            </label>
            <input
              onChange={(e) => {
                setRoomCode(e.target.value);
              }}
              className="border border-slate-300 p-2 font-sans"
              id="room_code"
              type="text"
              placeholder="Enter room code"
            />
            <label className="text-sm" htmlFor="student_id">
              Enter Student ID:
            </label>
            <input
              onChange={(e) => {
                setStudentID(e.target.value);
              }}
              className="border border-slate-300 p-2 font-sans"
              id="student_id"
              type="text"
              placeholder="EX: 211210244"
            />
            <label className="text-sm" htmlFor="student_name">
              Enter your name:
            </label>
            <input
              onChange={(e) => {
                setStudentName(e.target.value);
              }}
              className="border border-slate-300 p-2 font-sans"
              id="student_name"
              type="text"
              placeholder="Enter your name here"
            />
            <button
              onClick={() => {
                handleJoinRoom();
              }}
              className="bg-green-500 hover:bg-green-400 text-white mt-2 p-3"
            >
              Request to join room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNavBar;
