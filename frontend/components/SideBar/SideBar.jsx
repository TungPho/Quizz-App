import { NavLink } from "react-router-dom";
import { FaHome, FaPlus } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { MdClass } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { GoChecklist } from "react-icons/go";

import styles from "../SideBar/SideBar.module.css";
import { useEffect, useRef, useState } from "react";
const SideBar = () => {
  const role = "teacher";
  const modal = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    //
    setIsOpen(true);
    modal.current.style.visibility = "visible";
  };
  const closeModal = () => {
    setIsOpen(false);
    modal.current.style.visibility = "hidden";
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup when unmount
    };
  }, [isOpen]);
  return (
    <div>
      <div className={`${styles.side_bar}`}>
        <NavLink className={`icon link`} to={"/"}>
          <li>Quizzes</li>
        </NavLink>
        <div className={`${styles.my_school}`}>
          University Of Transport And Communication
        </div>
        <button onClick={showModal} className={`${styles.join_class_btn}`}>
          <p>
            <FaPlus />
          </p>
          <p> {role === "student" ? "Join Class" : "Create"}</p>
        </button>
        <div>
          <FaHome /> Explore
        </div>
        <div>
          <IoLibrary /> Library
        </div>
        <div>
          <TbReportSearch /> Test History
        </div>
        <div>
          <MdClass /> My Classes
        </div>
        <div>
          <IoIosLogOut /> Log out
        </div>
      </div>
      <div hidden ref={modal} className={`${styles.modal_container} hidden`}>
        {role === "student" ? (
          <div className={`${styles.modal}`}>
            <button onClick={closeModal}>X</button>
            <p>Student Modal</p>
          </div>
        ) : (
          <div className={`${styles.modal}`}>
            <div onClick={closeModal}>X</div>
            <div className="modal_btn">
              <GoChecklist />
              Create Assetments
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
