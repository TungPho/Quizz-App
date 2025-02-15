import { CiBellOn } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";

import styles from "../HomeNavBar/HomeNavBar.module.css";
const HomeNavBar = () => {
  return (
    <div className={styles.nav_bar}>
      <div className={`${styles.btn}`}>
        <CiBellOn />
      </div>
      <div className={`${styles.btn}`}>Enter Code</div>
      <div className={`${styles.profile} ${styles.btn}`}>
        Profile
        <IoMdArrowDropdown />
      </div>
    </div>
  );
};

export default HomeNavBar;
