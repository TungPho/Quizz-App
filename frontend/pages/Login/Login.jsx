import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("http://localhost:3000/api/v1/login", {
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    console.log(result);
    const res = await result.json();
    const role = res.role;
    navigate("/home", {
      state: {
        role,
      },
    });
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
          <div className="containers-1">
            <h1>Log In</h1>

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

            <button onClick={handleSubmit}>Log In</button>
          </div>
          <div className="containers-2">
            <img src={"images/background-login.png"} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
