import { useState } from "react";
import "./style.css";
import { CiMail, CiUser } from "react-icons/ci";
import { IoArrowBackSharp } from "react-icons/io5";
import { GiTeacher } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import Navbar from "../../components/Navbar/Navbar";

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="holder">
          {!isEnoughInfo ? (
            <div className="containers-1">
              <h1>Sign Up</h1>
              <div className="input-element">
                <CiUser />
                <input
                  placeholder=" Enter User Name"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="input-element">
                <CiMail />
                <input
                  placeholder=" Enter Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-element">
                <input
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button onClick={handleInfo}>Continue</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="containers-submit">
              <div>
                <button
                  className="back-btn"
                  onClick={() => setIsEnoughInfo(false)}
                >
                  <IoArrowBackSharp />
                </button>
                <div>
                  <h1>Select Your Role</h1>
                  <div className="role-options">
                    <div
                      onClick={handleSelectStudent}
                      className={`select-role ${!isTeacher ? "active" : ""}`}
                    >
                      <PiStudent />
                      <p>Student</p>
                    </div>
                    <div
                      onClick={handleSelectTeacher}
                      className={`select-role ${isTeacher ? "active" : ""}`}
                    >
                      <GiTeacher />
                      <p>Teacher</p>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit">Submit</button>
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
