import { useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";

const ClassDetails = () => {
  const { classId } = useParams();
  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex justify-between">
        <div className="flex ml-5">
          <button className="text-gray-500 mr-5  p-2 hover:bg-slate-300">
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

      <p className="ml-5 text-lg mt-10">Performance</p>

      <div
        className={`flex justify-center ${isOpenCreateRoom ? "" : "hidden"}`}
      >
        <div className="bg-white border border-black  rounded-md p-5">
          <h3>Create Room</h3>
          <h3>Room Code:</h3>
          <div className="p-3 border-slate-400 border">
            <input
              className="font-sans focus:outline-none"
              type="text"
              placeholder="UTC-CNTT-2-64@abd"
            />
            <button className="font-sans font-semibold text-white p-3 bg-green-500 hover:bg-green-400">
              Generate
            </button>
          </div>
          <p className="font-sans flex">
            Classname:
            <p className="ml-2 font-sans font-bold">IT-2</p>
          </p>
          <p className="font-sans flex">
            Teacher&apos;s name:
            <p className="ml-2 font-sans font-bold">Tung</p>
          </p>
          <div className="flex justify-between w-[80%] mt-3">
            <button
              onClick={() => {
                setIsOpenCreateRoom(false);
              }}
              className="font-sans font-semibold p-1 pr-5 pl-5 bg-slate-400 text-black hover:bg-slate-300"
            >
              Cancel
            </button>
            <button className="font-sans font-semibold text-white p-1 pr-5 pl-5 bg-green-500 hover:bg-green-400">
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
