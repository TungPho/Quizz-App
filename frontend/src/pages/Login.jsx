import { useContext, useEffect, useState } from "react";
import { QuizzContext } from "../context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { toast } from "react-toastify";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setSocket } = useContext(QuizzContext);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("http://localhost:3000/api/v1/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
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
      if (result.status !== 200) {
        toast.error("Wrong email or password");
        return;
      }
      toast.success(`Login Successful!`);
      navigate("/home/explore");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-white">
      {/* Left Panel - Login Form */}
      <div className="w-full md:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">
            Welcome to <span className="text-green-400">Quizzes</span> Community
          </h1>
          <p className="mb-4 sm:mb-6 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              href="#"
              className="text-green-600 hover:underline"
            >
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-1 text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-1 text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-green-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
            >
              Log in
            </button>

            {/* Signup Link for smaller screens */}
            <div className="sm:hidden text-center text-sm text-gray-600">
              New to Design Community?{" "}
              <a href="#" className="text-green-600 hover:underline">
                Create an account
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel - Background Image with Green Overlay */}
      <div className="hidden md:block md:w-1/2  relative overflow-hidden">
        <div className="absolute inset-0 opacity-60 z-10"></div>
        <img
          src="images/new_background.png"
          alt="3D geometric shapes"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
      </div>
    </div>
  );
};

export default Login;
