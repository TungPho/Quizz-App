import { useEffect, useState } from "react";
import LibrarySearchBar from "./LibrarySearchBar";
import { Link } from "react-router-dom";

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
      <LibrarySearchBar />
      <div className="flex mt-5">
        <h1 className="mr-20 w-[10%]">My Library</h1>
        <div className="flex flex-col w-full h-full">
          <ul className="flex">
            <li className="cursor-pointer mr-3 text-sm">Assetments</li>
            <li className="cursor-pointer mr-3 text-sm">Documents</li>
          </ul>
          {tests.map((test, index) => {
            return (
              <Link
                to={`/tests/${test._id}`}
                key={index}
                className="assessment w-2/3 border-solid border-black border-[0.2px] flex  p-5 mt-5 cursor-pointer hover:bg-gray-200"
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
                      <button className="p-1 text-white bg-[#31cd63] mr-2">
                        Edit
                      </button>
                      <button className="p-1 text-white bg-red-500 hover:bg-red-400">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Library;
