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

  const handleInfo = (e) => {
    e.preventDefault();
    setIsEnoughInfo(true);

    //  alert("Please fill in all the fields");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("http://localhost:3000/api/v1/users", {
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        role: isTeacher ? "teacher" : "student",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    console.log(result);
    const res = await result.json();
    console.log(res);
  };

  const handleSelectTeacher = () => {
    setIsTeacher(true);
  };
  const handleSelectStudent = () => {
    setIsTeacher(false);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-[50%] flex items-center justify-center p-2 rounded-lg mt-2 h-full">
          {!isEnoughInfo ? (
            <div className="flex-col w-[50%] p-10 rounded-lg">
              <h1>Sign Up</h1>
              <div className="border border-solid border-black flex items-center w-full p-[10px] m-[10px] rounded-[10px]">
                <CiUser />
                <input
                  placeholder=" Enter User Name"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="border border-solid border-black flex items-center w-full p-[10px] m-[10px] rounded-[10px]">
                <CiMail />
                <input
                  placeholder=" Enter Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="border border-solid border-black flex items-center w-full p-[10px] m-[10px] rounded-[10px]">
                <input
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="w-full border-none bg-[#31cd63] text-white rounded-lg cursor-pointer text-center self-center content-center p-2 hover:bg-[#5ae47f]"
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
                <button
                  className="w-[10%] align-middle border-none bg-[#31cd63] text-white rounded-sm flex justify-center h-5"
                  onClick={() => setIsEnoughInfo(false)}
                >
                  <IoArrowBackSharp />
                </button>
                <div>
                  <h1>Select Your Role</h1>
                  <div className="flex">
                    <div
                      onClick={handleSelectStudent}
                      className={`flex border border-solid border-black p-[15px] items-center bg-[#747475] text-white w-1/2 h-[3em] m-[10px] cursor-pointer"  ${
                        !isTeacher ? "bg-[#45a049]" : ""
                      }`}
                    >
                      <PiStudent />
                      <p>Student</p>
                    </div>
                    <div
                      onClick={handleSelectTeacher}
                      className={`flex border border-solid border-black p-[15px] items-center bg-[#747475] text-white w-1/2 h-[3em] m-[10px] cursor-pointer" ${
                        isTeacher ? "bg-[#45a049]" : ""
                      }`}
                    >
                      <GiTeacher />
                      <p>Teacher</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="bg-[#45a049] text-white p-2 w-[40%]"
                type="submit"
              >
                Submit
              </button>
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
