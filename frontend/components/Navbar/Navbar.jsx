import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <nav className={styles.nav_bar_container}>
      <ul className={styles.nav_bar}>
        <NavLink className={`${styles.icon} link`} to={"/"}>
          <li>Quizzes</li>
        </NavLink>
        <div>
          <NavLink className={`${styles.enter_code_btn} link`}>
            Enter Code
          </NavLink>
          <NavLink className={`${styles.log_in_btn} link`} to={"/login"}>
            Log in
          </NavLink>
          <NavLink className={`${styles.sign_up_btn} link`} to="/signup">
            Sign up
          </NavLink>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
