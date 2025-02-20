import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center h-[74.4px] shadow-lg">
      <NavLink className="text-[#31cd63] text-3xl" to="/">
        Quizzes
      </NavLink>
      <ul className="w-[30%] h-[50%] flex flex-row justify-between items-center">
        <NavLink className="flex flex-col items-center justify-center w-[30%] h-[90%] border-2 border-gray-500 bg-transparent text-[#31cd63] rounded-md cursor-pointer text-center self-center hover:bg-[#31cd63] hover:text-white transition">
          Enter Code
        </NavLink>

        <NavLink
          className=" flex flex-col items-center  justify-center w-4/12 h-[90%]  bg-[#31cd63] text-white rounded-md text-center self-center cursor-pointer border-none hover:bg-[#5ae47f] transition"
          to="/login"
        >
          Log in
        </NavLink>

        <NavLink
          className=" flex flex-col items-center  justify-center w-[30%] h-[90%] bg-[#31cd63] text-white rounded-md cursor-pointer text-center self-center border-none hover:bg-[#5ae47f]"
          to="/signup"
        >
          Sign up
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
