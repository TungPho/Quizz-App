import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaPlus } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { MdClass } from "react-icons/md";
import { GoChecklist } from "react-icons/go";

import { useEffect, useRef, useState } from "react";
const SideBar = () => {
  const role = localStorage.getItem("role");
  const modal = useRef(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup when unmount
    };
  }, [isOpen]);
  return (
    <div>
      <div
        className={`flex flex-col justify-between w-[15%] h-full border-r border-gray-300 border-[1px] fixed top-0 text-gray-500`}
      >
        <div>
          <NavLink className="text-[#31cd63] text-3xl ml-3" to={"/"}>
            Quizzes
          </NavLink>
          <div className="border border-solid border-black m-[10px] p-[10px] rounded-[10px] text-[12px]">
            University Of Transport And Communication
          </div>
          <div className="flex justify-center">
            <button
              onClick={showModal}
              className="flex justify-center items-center bg-[#31cd63] rounded-lg text-white p-[5px] w-[90%] ml-[5px] hover:bg-green-400"
            >
              <p>
                <FaPlus className="mr-1" />
              </p>
              <p> {role === "student" ? "Join Class" : "Create"}</p>
            </button>
          </div>
          <NavLink
            to={"/home/explore"}
            className={({ isActive }) =>
              `flex ml-[5%] mt-[5%] cursor-pointer p-[10px] hover:bg-slate-200 items-center ${
                isActive ? "text-[#31cd63]" : "hover:bg-slate-200"
              }`
            }
          >
            <FaHome className="mr-1" />
            Explore
          </NavLink>
          <NavLink
            to={"/home/library"}
            className={({ isActive }) =>
              `flex ml-[5%] mt-[5%] cursor-pointer p-[10px] hover:bg-slate-200 items-center ${
                isActive ? "text-[#31cd63]" : "hover:bg-slate-200"
              }`
            }
          >
            <IoLibrary className="mr-1" /> Library
          </NavLink>
          <NavLink
            to={"/home/test_history"}
            className={({ isActive }) =>
              `flex ml-[5%] mt-[5%] cursor-pointer p-[10px] hover:bg-slate-200 items-center ${
                isActive ? "text-[#31cd63]" : "hover:bg-slate-200"
              }`
            }
          >
            <TbReportSearch className="mr-1" /> Test History
          </NavLink>
          <NavLink
            to={"/home/my_classes"}
            className={({ isActive }) =>
              `flex ml-[5%] mt-[5%] cursor-pointer p-[10px] hover:bg-slate-200 items-center ${
                isActive ? "text-[#31cd63]" : "hover:bg-slate-200"
              }`
            }
          >
            <MdClass className="mr-1" /> My Classes
          </NavLink>
        </div>
      </div>
      <div ref={modal} className={`flex justify-center`}>
        {role === "student" ? (
          <div
            className={`${
              isOpen ? "" : "hidden"
            } border border-black rounded-sm flex flex-col p-3 absolute mt-20`}
          >
            <div>
              <button onClick={closeModal}>X</button>
            </div>
            <input
              className="border border-slate-400 mb-3 mt-3 p-3"
              type="text"
              placeholder="Enter class name"
            />
            <button className="border border-black">
              Send Request to Join
            </button>
          </div>
        ) : (
          <div
            className={`w-[40%] grid grid-cols-[90%_90%]  h-0 gap-x-[10px] gap-y-[10px] justify-center fixed top-[10%] border border-gray-500 p-[10%] content-center z-[10] bg-white ${
              isOpen ? "visible" : "hidden"
            }`}
          >
            <button
              className="flex justify-center w-[10%] hover:border hover:border-black hover:bg-[#DEDEDE] rounded-2xl text-gray-400 hover:border-none"
              onClick={closeModal}
            >
              X
            </button>
            <div></div>
            <div
              onClick={() => {
                navigate("/create-question");
              }}
              className="flex justify-center items-center self-center border border-solid border-black rounded-[10px] p-5 cursor-pointer w-[90%] h-[50%] hover:border-[#31cd63]"
            >
              <GoChecklist />
              Create Assetments
            </div>
            <div className="flex justify-center items-center self-center border border-solid border-black rounded-[10px] p-5 cursor-pointer w-[90%] h-[50%] hover:border-[#31cd63]">
              <GoChecklist />
              Create Lessons
            </div>
            <div
              onClick={() => {}}
              className="flex justify-center items-center self-center border border-solid border-black rounded-[10px] p-5 cursor-pointer w-[90%] h-[50%] hover:border-[#31cd63]"
            >
              <GoChecklist />
              Create Classes
            </div>
            <div className="flex justify-center items-center self-center border border-solid border-black rounded-[10px] p-5 cursor-pointer w-[90%] h-[50%] hover:border-[#31cd63]">
              <GoChecklist />
              Comprehension
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
