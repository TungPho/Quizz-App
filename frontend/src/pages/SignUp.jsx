import { useState } from "react";
import { CiMail, CiUser } from "react-icons/ci";
import { IoArrowBackSharp } from "react-icons/io5";
import { GiTeacher } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import Navbar from "../components/Navbar";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEnoughInfo, setIsEnoughInfo] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isSetRole, setIsSetRole] = useState(false);

  // Personal Info
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const handleInfo = (e) => {
    e.preventDefault();
    if (!username && !password && !email) {
      alert("Please fill in all the information");
      return;
    }
    setIsEnoughInfo(true);

    //  alert("Please fill in all the fields");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let user;
    if (!isTeacher) {
      user = {
        username: username,
        email: email,
        password: password,
        role: isTeacher ? "teacher" : "student",
        user_attributes: {
          name,
          student_id: studentID ? studentID : "",
          school_name: schoolName,
        },
      };
    } else {
      user = {
        username: username,
        email: email,
        password: password,
        role: isTeacher ? "teacher" : "student",
        user_attributes: {
          name,
          school_name: schoolName,
        },
      };
    }

    const result = await fetch("http://localhost:3000/api/v1/users", {
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    console.log(result);
    const res = await result.json();
    console.log(res);
  };

  const resetInfo = () => {
    setName("");
    setUsername("");
    setEmail("");
    setIsTeacher(false);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center ">
        <div className="w-[50%] flex items-center justify-center p-2 rounded-lg mt-2 h-full">
          {!isEnoughInfo ? (
            <div className="flex-col items-center justify-center w-[50%] p-10 rounded-lg">
              <h1>Sign Up</h1>
              <div className="border border-solid border-black flex items-center w-full p-[10px] m-[10px] rounded-[10px]">
                <CiUser />
                <input
                  className="focus:outline-none"
                  placeholder=" Enter User Name"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="border border-solid border-black flex items-center w-full p-[10px] m-[10px] rounded-[10px]">
                <CiMail />
                <input
                  className="focus:outline-none"
                  placeholder=" Enter Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="border border-solid border-black flex items-center w-full p-[10px] m-[10px] rounded-[10px]">
                <input
                  className="focus:outline-none"
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="w-full ml-3 border-none bg-[#31cd63] text-white rounded-lg cursor-pointer text-center self-center content-center p-2 hover:bg-[#5ae47f]"
                onClick={handleInfo}
              >
                Continue
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex-col justify-between w-[50%]"
            >
              <div>
                <div>
                  <div
                    className={`flex flex-col ${
                      isSetRole ? "hidden" : ""
                    }  h-[250px] mr-3 justify-between`}
                  >
                    <div>
                      <h1>Select Your Role</h1>
                      <button
                        className="w-[10%] p-2 align-middle border-none bg-[#31cd63] text-white rounded-sm flex justify-center"
                        onClick={() => {
                          setIsEnoughInfo(false);
                          resetInfo();
                        }}
                      >
                        <IoArrowBackSharp />
                      </button>
                    </div>

                    <div className="flex flex-col ">
                      <div className="flex">
                        <div
                          onClick={() => {
                            setIsTeacher(false);
                          }}
                          className={`cursor-pointer flex  p-[15px] items-center  text-white w-1/2 h-[3em] m-[10px] cursor-pointer" ${
                            !isTeacher ? "bg-[#45a049]" : "bg-[#747475]"
                          }`}
                        >
                          <PiStudent />
                          <p>Student</p>
                        </div>
                        <div
                          onClick={() => {
                            setIsTeacher(true);
                          }}
                          className={`cursor-pointer flex  p-[15px] items-center  text-white w-1/2 h-[3em] m-[10px] cursor-pointer" ${
                            isTeacher ? "bg-[#45a049]" : "bg-[#747475]"
                          }`}
                        >
                          <GiTeacher />
                          <p>Teacher</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsSetRole(true);
                      }}
                      className="bg-[#31cd63] hover:bg-green-400 p-1 text-white w-full"
                    >
                      Next
                    </button>
                  </div>
                  {/*Enter Info Section*/}
                  <div
                    className={`${
                      isSetRole && !isTeacher ? "" : "hidden"
                    }  mb-2 w-4/5`}
                  >
                    <button
                      className="w-[20%] p-2 align-middle border-none bg-[#31cd63] text-white rounded-sm flex justify-center"
                      onClick={() => setIsSetRole(false)}
                    >
                      <IoArrowBackSharp />
                    </button>
                    <div>
                      <h1>Enter your Personal Info</h1>
                      <input
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        className="p-2 border border-slate-300 mb-2 mt-1 w-full"
                        type="text"
                        placeholder="Enter your name"
                      />
                      <input
                        onChange={(e) => {
                          setStudentID(e.target.value);
                        }}
                        className="p-2 border border-slate-300 mb-2 mt-1 w-full"
                        type="text"
                        placeholder="Enter Student ID"
                      />
                      <input
                        onChange={(e) => {
                          setSchoolName(e.target.value);
                        }}
                        className="p-2 border border-slate-300 mb-2 mt-1 w-full"
                        type="text"
                        placeholder="Enter School name"
                      />
                      <button
                        className="bg-[#45a049] text-white p-2 w-[40%]"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  <div
                    className={`${
                      isSetRole && isTeacher ? "" : "hidden"
                    }  mb-2 w-4/5`}
                  >
                    <div className=" p-3 mt-5 flex flex-col justify-between h-[350px]">
                      <button
                        className="w-[20%] p-2 align-middle border-none bg-[#31cd63] text-white rounded-sm flex justify-center"
                        onClick={() => {
                          setIsSetRole(false);
                          setName("");
                          setSchoolName("");
                        }}
                      >
                        <IoArrowBackSharp />
                      </button>
                      <div>
                        <h1>Enter your Personal Info</h1>
                        <input
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          className="p-2 border border-slate-300 mb-2 mt-1"
                          type="text"
                          placeholder="Enter your name"
                        />
                        <input
                          onChange={(e) => {
                            setSchoolName(e.target.value);
                          }}
                          className="p-2 border border-slate-300 mb-2 mt-1"
                          type="text"
                          placeholder="Enter School name"
                        />
                        <button
                          className="bg-[#45a049] text-white p-2 w-[40%]"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <button
                className="bg-[#45a049] text-white p-2 w-[40%]"
                type="submit"
              >
                Submit
              </button> */}
            </form>
          )}
          <div className="containers-2">
            <img src={"images/background-login.png"} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
