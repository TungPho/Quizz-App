import { NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="nav-bar-container">
      <ul className="nav-bar">
        <NavLink className={"link"} to={"/"}>
          <li>Quizzes</li>
        </NavLink>

        <div>
          <NavLink className="enter-code-btn link">Enter Code</NavLink>
          <NavLink className="log-in-btn link" to={"/login"}>
            Log in
          </NavLink>
          <NavLink className="sign-up-btn link" to="/signup">
            Sign up
          </NavLink>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
