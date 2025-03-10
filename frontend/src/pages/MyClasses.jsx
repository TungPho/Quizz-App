import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import HomeNavBar from "../components/HomeNavBar";

const MyClasses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [className, setClassName] = useState("");
  // remember to get all classes from teacher's id
  const [classes, setClasses] = useState([]);
  const [isEditClass, setIsEditClass] = useState(false);
  const userID = localStorage.getItem("userID");

  const handleCreateClass = async () => {
    const req = await fetch(`http://localhost:3000/api/v1/classes`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: className,
        teacherId: userID,
      }),
    });
    const res = await req.json();
    console.log(res);
  };
  const handleOpenMenu = (index) => {
    document.querySelector(`#menu-${index}`).classList.toggle("hidden");
  };

  useEffect(() => {
    const fetchClasses = async () => {
      const req = await fetch("http://localhost:3000/api/v1/classes");
      const classes = await req.json();
      setClasses(classes.metadata);
    };

    fetchClasses();
  }, []);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !event.target.closest(".kebab-menu") &&
        !event.target.closest(".menu-content")
      ) {
        document.querySelectorAll('[id^="menu-"]').forEach((menu) => {
          menu.classList.add("hidden"); // Thêm class hidden để ẩn menu
        });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <SideBar />
      <HomeNavBar />
      <div className="ml-[250px]">
        <div
          className={`flex justify-center relative right-[10%] ${
            isOpen ? "" : "hidden"
          }`}
        >
          <div
            className={` fixed top-[20%] border w-1/3 border-gray-500  p-2 z-[9] bg-white rounded-md `}
          >
            <div className="flex justify-between">
              <div>{isEditClass ? "Edit class details" : "Create Class"}</div>
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="border  border-slate-500 rounded-full p-2 text-gray-400  hover:bg-slate-300"
              >
                <IoMdClose />
              </button>
            </div>

            <p className="text-sm text-slate-500 font-sans">Enter class name</p>
            <input
              onChange={(e) => {
                setClassName(e.target.value);
              }}
              value={className}
              className="w-full mb-2 mt-2 border rounded-md border-slate-400 text-sm font-sans focus:outline-none p-2"
              type="text"
              placeholder="Try 'CNTT-2' Or 'Math Class'"
            />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  handleCreateClass();
                  setIsOpen(false);
                  setClassName("");
                }}
                className="border bg-[#31cd63] text-white p-1 rounded-md hover:bg-green-400"
              >
                {isEditClass ? "Save" : "Create Class"}
              </button>
            </div>
          </div>
        </div>
        <p>My Classes</p>
        <div className="w-full flex justify-between mt-2  ">
          <div className="flex w-full items-center   text-slate-500 font-sans">
            <div className="flex items-center border-solid border-slate-400 border-[1px] rounded-3xl p-1 w-1/4">
              <CiSearch className="ml-4" />
              <input
                className="w-full focus:outline-none"
                type="text"
                placeholder="  Search for a class"
              />
            </div>
          </div>
          <button
            onClick={() => {
              setIsOpen(true);
              setClassName("");
              setIsEditClass(false);
            }}
            className=" flex items-center justify-center  pl-1 w-[20%] border-[1px] bg-[#31cd63] text-white rounded-md hover:bg-green-400 mr-10"
          >
            <FaCirclePlus className="mr-2 text-md" />
            Create a class
          </button>
        </div>
        {classes.map((c, index) => {
          return (
            <div
              key={index}
              className="flex justify-between border w-1/2 border-slate-300 mt-5 rounded-md p-2 "
            >
              <div className="">
                <p className="font-sans">{c.name}</p>
                <p className="font-sans text-sm mt-1 text-slate-600">
                  {c.students.length} students
                </p>
              </div>
              <button
                className="kebab-menu"
                onClick={() => {
                  handleOpenMenu(index);
                }}
              >
                <CiMenuKebab />
              </button>
              <div
                id={`menu-${index}`}
                className={`absolute left-[805px] mt-3 border  text-[13px] border-slate-300 ml-3 z-2 bg-white hidden menu-content`}
              >
                <Link
                  to={`/class/${c._id}`}
                  className="font-sans hover:bg-slate-300 cursor-pointer p-1"
                >
                  View Details
                </Link>
                <p
                  onClick={() => {
                    setIsOpen(true);
                    setIsEditClass(true);
                    setClassName(c.name);
                  }}
                  className="font-sans hover:bg-slate-300 cursor-pointer p-1"
                >
                  Edit
                </p>
                <p className="font-sans hover:bg-slate-300 cursor-pointer p-1">
                  Delete class
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyClasses;
