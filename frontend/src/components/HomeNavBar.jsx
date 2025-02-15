import { CiBellOn } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";

const HomeNavBar = () => {
  return (
    <div className="flex flex-row justify-end items-center h-[50px] shadow-lg ml-[15%] sticky top-0 bg-white">
      <div
        className={`border border-gray-500 self-center p-2 text-[13px] mr-[10px]`}
      >
        <CiBellOn />
      </div>
      <div className="border border-gray-500 self-center p-2 text-[13px] mr-[10px]">
        Enter Code
      </div>
      <div className="border border-gray-500 self-center  text-[13px] mr-[10px]  border-solid  rounded-[20px] p-[5px]">
        Profile
        <IoMdArrowDropdown />
      </div>
    </div>
  );
};

export default HomeNavBar;
