import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { QuizzContext } from "../context/ContextProvider";
import { IoReload } from "react-icons/io5";

const ClassDetails = () => {
  const { socket, setState } = useContext(QuizzContext);
  const { classId } = useParams();
  const userID = sessionStorage.getItem("userID");
  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [classes, setClass] = useState(null);
  const [className, setClassName] = useState("");
  const [tests, setTests] = useState([]);
  const [activeRooms, setActiveRooms] = useState([]);
  const navigate = useNavigate();

  // generate className + 6 digits code
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

  let createRoom = () => {
    socket.emit("createRoom", roomCode, userID, className);
  };

  useEffect(() => {
    const fetchClass = async () => {
      const req = await fetch(
        `http://localhost:3000/api/v1/classes/${classId}`
      );
      const res = await req.json();
      setClass(res.metadata);
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
    // emit 1 event để lấy danh sách các phòng theo tên class
    socket.emit("getRoomList", className);
  }, [className, socket]);

  useEffect(() => {
    // event này kích hoạt khi server gửi lại rooms
    //chỉ lấy các room thuộc class này, và mỗi tên lớp là unique
    socket.on("roomList", (rooms) => {
      setActiveRooms(rooms);
      console.log(rooms);
    });

    return () => {
      socket.off("roomList");
    };
  }, [socket]);

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex justify-between">
        <div className="flex ml-5">
          <button
            onClick={() => {
              setState("myClasses");
              navigate("/home");
            }}
            className="text-gray-500 mr-5  p-2 hover:bg-slate-300"
          >
            <IoIosArrowRoundBack className="text-3xl" />
          </button>
          <div>
            <p className="font-sans font-semibold text-lg">Class 1</p>
            <p className="font-sans text-sm">0 Students</p>
          </div>
        </div>
        <div className="flex mr-5 justify-between h-fit">
          <button
            onClick={() => {
              setIsOpenCreateRoom(true);
            }}
            className="bg-white h-fit border p-1 border-slate-400 rounded-md text-sm mr-3 font-sans font-semibold hover:bg-slate-300"
          >
            Create Room
          </button>
          <button className="bg-white border h-fit p-1 border-slate-400 rounded-md text-sm  font-sans font-semibold  hover:bg-slate-300">
            Add Student
          </button>
        </div>
      </div>

      <div className="flex items-center mt-10">
        <p className="ml-5 text-lg mr-3">Active Rooms:</p>
        <button
          onClick={() => {
            socket.emit("getRoomList", className);
          }}
          className="border border-black p-2 rounded-md bg-white hover:bg-slate-300"
        >
          <IoReload />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-4  border-r-black border-t-black border-l-black border bg-white font-semibold text-center p-3 rounded-t-md w-2/3">
          <div className="col-span-1">Class Name</div>
          <div className="col-span-1">Room Number</div>
          <div className="col-span-1">Students Joined</div>
          <div className="col-span-1 flex justify-center">Status</div>
        </div>
      </div>

      {activeRooms.map((room, index) => {
        return (
          <div key={index} className="flex justify-center ">
            <div
              onClick={() => {
                navigate(`/room/${room[0]}`);
              }}
              className="cursor-pointer hover:bg-gray-300 grid grid-cols-4 border-l-black border-r-black border-b-black  border  bg-white font-semibold text-center p-3  w-2/3"
            >
              <div className="col-span-1">{className}</div>
              <div className="col-span-1">{room[0]}</div>
              <div className="col-span-1">{room[1].length - 1} Students</div>
              <div className="col-span-1 text-green-400">Active</div>
            </div>
          </div>
        );
      })}
      <div
        className={`flex justify-center fixed left-[660px] top-[120px]  ${
          isOpenCreateRoom ? "" : "hidden"
        }`}
      >
        <div className="bg-white border fixed border-black w-1/3 rounded-md p-5">
          <h3>Create Room</h3>
          <h3>Room Code:</h3>
          <div className="p-3 border-slate-400 border flex justify-between">
            <input
              value={roomCode}
              disabled
              className="font-sans focus:outline-none"
              type="text"
              placeholder="UTC-CNTT-2-64@abd"
            />
            <button
              onClick={() => {
                generateRoomCode();
              }}
              className="font-sans font-semibold text-white p-3 bg-green-500 hover:bg-green-400"
            >
              Generate
            </button>
          </div>
          <div className="font-sans flex">
            Classname:
            <p className="ml-2 font-sans font-bold">{className}</p>
          </div>
          <div className="font-sans flex">
            Teacher&apos;s name:
            <p className="ml-2 font-sans font-bold">Tung</p>
          </div>

          <select
            className="w-1/2 font-sans font-semibold border border-slate-300 mt-3"
            name=""
            id=""
          >
            <option className="font-sans" value="">
              Select Test
            </option>
            {tests.map((test, index) => {
              return <option key={index}>{test.title}</option>;
            })}
          </select>
          <div className="flex justify-between mt-3">
            <button
              onClick={() => {
                setIsOpenCreateRoom(false);
              }}
              className="font-sans font-semibold p-1 pr-5 pl-5 bg-slate-400 text-black hover:bg-slate-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsOpenCreateRoom(false);
                createRoom();
              }}
              className="font-sans font-semibold text-white p-1 pr-5 pl-5 bg-green-500 hover:bg-green-400"
            >
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
