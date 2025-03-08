import { CiMail } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { QuizzContext } from "../context/ContextProvider";
import io from "socket.io-client";
// login, save role, and token, user
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setSocket } = useContext(QuizzContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("http://localhost:3000/api/v1/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log(result);
      const res = await result.json();
      const role = res.role;
      // Remember to set token
      localStorage.setItem("role", role);
      localStorage.setItem("userID", res.id);
      setSocket(
        io("ws://localhost:3000", {
          query: { userId: res.id, role }, // Gửi userId và role khi kết nối
        })
      );
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-[50%] border border-black flex items-center justify-between p-2 rounded-lg mt-2 h-full">
          <div className="flex-col w-[50%] p-2 rounded">
            <h1>Log In</h1>

            <div className="border border-solid border-black flex items-center w-[90%] p-[10px] m-[10px] rounded-[10px]">
              <CiMail />
              <input
                className="focus:outline-none"
                placeholder=" Enter Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="border border-solid border-black flex items-center w-[90%] p-[10px] m-[10px] rounded-[10px]">
              <input
                className="focus:outline-none"
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="font-sans text-green-500 ml-3 mb-2 cursor-pointer">
              Forgot your password ?
            </div>
            <button
              className="border-none ml-2 w-[91%] bg-[#31cd63] text-white rounded-lg cursor-pointer text-center self-center content-center p-2 hover:bg-[#5ae47f]"
              onClick={handleSubmit}
            >
              Log In
            </button>
          </div>
          <div>
            <img src="images/background-login.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
