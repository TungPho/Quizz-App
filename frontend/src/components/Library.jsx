import { useEffect, useState } from "react";
import LibrarySearchBar from "./LibrarySearchBar";
import { Link, NavLink } from "react-router-dom";
import SideBar from "./SideBar";
import HomeNavBar from "./HomeNavBar";

// This is where we save documents and tests
const Library = () => {
  // perform when the component mounted
  const [tests, setTests] = useState([]);
  useEffect(() => {
    const fetchTest = async () => {
      const test = await fetch("http://localhost:3000/api/v1/tests");
      const res = await test.json();
      setTests(res.metadata);
    };
    fetchTest();
  }, []);

  return (
    <div>
      <HomeNavBar />
      <SideBar />
      <div className="flex justify-center">
        <LibrarySearchBar />
      </div>

      <div className="flex mt-5 ml-[250px]">
        <div className="flex flex-col w-full">
          <h1 className="mr-20 w-[10%] mb-3">My Library</h1>

          <ul className="flex">
            <NavLink className="cursor-pointer mr-3 text-sm hover:text-[#31cd63]">
              Assetments
            </NavLink>
            <NavLink className="cursor-pointer mr-3 text-sm hover:text-[#31cd63]">
              Documents
            </NavLink>
          </ul>
          <div className="grid grid-cols-2 gap-5 mr-10">
            {tests.map((test, index) => {
              return (
                <div
                  to={`/tests/${test._id}`}
                  key={index}
                  className="assessment w-full border-solid border-black border-[0.2px] flex  p-5 mt-5 cursor-pointer hover:bg-gray-200 rounded-xl"
                >
                  <div className="flex items-center border-solid  w-1/5 mr-5 bg-[#31cd63]"></div>
                  <div className="w-full">
                    <div className="border-solid border-slate-600 text-slate-600 border-[1px] w-fit  h-fit text-[11px] rounded-2xl p-1">
                      Assessment
                    </div>
                    <div className="flex justify-between ">
                      <p>{test.title}</p>
                      <p>{test.timeLimit} mins</p>
                    </div>

                    <div className="flex items-center   justify-between">
                      <div className="flex">
                        <p className="mr-3 text-sm">
                          {test.questions.length} questions
                        </p>
                        <p className="mr-3 text-sm">Mathematics</p>
                      </div>
                      <div>
                        <Link
                          to={`/tests/${test._id}`}
                          className="p-1 text-white bg-[#31cd63] mr-2"
                        >
                          Edit
                        </Link>
                        <button className="p-1 text-white bg-red-500 hover:bg-red-400">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* button cho phân trang */}
          <div className="mt-10 flex justify-center">
            <button className="text-white w-[3%]  rounded-3xl p-1 hover:bg-green-600 bg-green-400">
              1
            </button>
            <button className="text-white w-[3%]  rounded-3xl p-1 hover:bg-green-600 bg-green-400">
              2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
