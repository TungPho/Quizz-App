import { useParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { SiGoogleforms } from "react-icons/si";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaGreaterThan } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";

import { IoIosMove } from "react-icons/io";
import { GoCheck } from "react-icons/go";

const TestEdit = () => {
  const { testId } = useParams();
  console.log(testId);
  return (
    <div className="">
      <div className="flex justify-between mb-5">
        <div className="flex">
          <button className="border-gray-300 border-solid border-[1px] ml-2 p-1 ">
            <IoArrowBackSharp />
          </button>
          <input type="text" placeholder="Enter the title of the test" />
        </div>
        <button className="text-white bg-green-500">Save Test</button>
      </div>

      <div className="flex justify-center w-full">
        <div className="mr-5 w-1/5">
          <div className="flex items-center border-solid border-slate-300 border-[1px] p-3 rounded-sm">
            <IoTimeOutline className="mr-1" />
            <select className="text-sm w-full" name="" id="">
              <option value="0">Select Time</option>
              <option value="1">5 mins</option>
              <option value="2">15 mins</option>
              <option value="3">45 mins</option>
              <option value="4">60 mins</option>
              <option value="5">90 mins</option>
              <option value="5">150 mins</option>
            </select>
          </div>
          <div className="mt-5 text-sm border-solid border-slate-300 border-[1px]rounded-sm bg-green-500 text-white flex flex-col justify-between items-center h-1/2">
            <p>Import from</p>
            <p className="flex items-center justify-between hover:bg-green-400 w-full p-3 cursor-pointer">
              <div className="flex items-center">
                <SiGoogleforms className="mr-1" />
                Google forms
              </div>
              <FaGreaterThan className="text-gray-200" />
            </p>
            <p className="flex justify-between hover:bg-green-400 w-full p-3 cursor-pointer">
              <div className="flex items-center">
                <LuFileSpreadsheet className="mr-1" />
                Spreadsheet
              </div>

              <FaGreaterThan className="text-gray-200" />
            </p>
          </div>
        </div>
        <div className="w-2/3">
          <div className="border-solid border-slate-300 border-[1px] p-3">
            <p>Search question in Quizzes Libarry</p>
            <div className="border-solid border-black border-[1px] flex justify-between p-3">
              <input
                className="focus:outline-none"
                type="text"
                placeholder="Search"
              />
              <button className="flex items-center border-slate-300 border-solid border-[1px] p-1">
                <CiSearch className="mr-2" />
                Search Questions
              </button>
            </div>
          </div>
          <p className="mt-5">1 question</p>
          <div className="border-solid border-slate-300 p-3 border-[1px]">
            <div className="flex justify-between">
              <button className="border-slate-300 border-solid border-[1px]">
                <IoIosMove />
              </button>
              <div className="flex border-solid  w-1/6">
                <button className="flex mr-5 items-center border-solid border-slate-300 justify-center border-[1px] text-sm text-center w-1/2 hover:bg-slate-100">
                  <CiEdit className="mr-1 text-lg" />
                  Edit
                </button>
                <button className="flex mr-5 items-center border-solid border-slate-300 justify-center border-[1px] text-sm text-center w-1/3  hover:bg-slate-100">
                  <CiTrash className="mr-1 text-lg" />
                </button>
              </div>
            </div>
            <div className="flex justify-between w-fit">
              <p className="text-sm mr-2">Question:</p>
              <p className="text-sm ">Tom and Jerry ?</p>
            </div>

            <p className="text-sm ">Answer choices:</p>
            <div className="grid grid-cols-2 w-1/4 text-sm">
              <div className="flex items-center">
                <IoMdClose />
                <p>Jerry</p>
              </div>
              <div className="flex items-center">
                <GoCheck />
                <p>Tom</p>
              </div>
              <div className="flex items-center">
                <IoMdClose />
                <p>Bill</p>
              </div>
              <div className="flex items-center">
                <IoMdClose />
                <p>James</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestEdit;
