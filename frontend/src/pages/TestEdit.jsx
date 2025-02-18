import { Link, useNavigate, useParams } from "react-router-dom";
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
import { useEffect, useState } from "react";

const TestEdit = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  // get Test
  const [test, setTest] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  // get all questions of that test
  const [questions, setQuestions] = useState([]);
  const [timeLimit, setTimeLimit] = useState(0);
  useEffect(() => {
    const fetchTest = async () => {
      const req = await fetch(`http://localhost:3000/api/v1/tests/${testId}`);
      const testFound = await req.json();
      console.log(testFound.metadata);
      setTest(testFound.metadata);
      setNewTitle(testFound.metadata.title);
      setTimeLimit(testFound.metadata.timeLimit);
      // loop over the questions in the test
      const questionPromises = testFound.metadata.questions.map(
        async (questionID) => {
          const questionDetail = await fetch(
            `http://localhost:3000/api/v1/questions/${questionID}`
          );
          const finalQuestionDetail = await questionDetail.json();
          return finalQuestionDetail.metadata;
        }
      );
      const allQuestions = await Promise.all(questionPromises);
      console.log(allQuestions);
      setQuestions(allQuestions);
    };
    fetchTest();
  }, [testId]);

  const handleSaveTest = async () => {
    console.log(timeLimit);
    console.log(newTitle);
    const req = await fetch(`http://localhost:3000/api/v1/tests/${testId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timeLimit, title: newTitle }),
    });
    const res = await req.json();
    console.log(res);
  };
  const handleDeleteQuestion = async (id) => {
    console.log(id);
  };
  return (
    <div className="">
      <div className="flex justify-between mb-5 border-gray-300 border-b-[1px]">
        <div className="flex">
          <button
            onClick={() => {
              navigate("/home");
            }}
            className=" ml-2 p-1 mr-3"
          >
            <IoArrowBackSharp />
          </button>
          <input
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            value={newTitle}
            type="text"
            placeholder="Enter the title of the test"
          />
        </div>
        <button
          onClick={() => {
            handleSaveTest();
          }}
          className="text-white bg-green-500 hover:bg-green-400 p-2"
        >
          Save Test
        </button>
      </div>

      <div className="flex justify-center w-full">
        <div className="mr-5 w-1/5">
          <div className="flex items-center border-solid border-slate-300 border-[1px] p-3 rounded-sm">
            <IoTimeOutline className="mr-1" />
            <select
              onChange={(e) => {
                const value = e.target.value;
                setTimeLimit(parseInt(value));
              }}
              value={timeLimit}
              className="text-sm w-full"
              name=""
              id=""
            >
              <option value="0">Select Time</option>
              <option value="5">5 mins</option>
              <option value="15">15 mins</option>
              <option value="45">45 mins</option>
              <option value="60">60 mins</option>
              <option value="90">90 mins</option>
              <option value="150">150 mins</option>
            </select>
          </div>
          <div className="mt-5 text-sm border-solid border-slate-300 border-[1px]rounded-sm bg-green-500 text-white flex flex-col justify-between items-center h-fit">
            <p>Import from</p>
            <div className="flex items-center justify-between hover:bg-green-400 w-full p-3 cursor-pointer">
              <div className="flex items-center">
                <SiGoogleforms className="mr-1" />
                Google forms
              </div>
              <FaGreaterThan className="text-gray-200" />
            </div>
            <div className="flex justify-between hover:bg-green-400 w-full p-3 cursor-pointer">
              <div className="flex items-center">
                <LuFileSpreadsheet className="mr-1" />
                Spreadsheet
              </div>

              <FaGreaterThan className="text-gray-200" />
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <div className="border-solid border-slate-300 border-[1px] p-3">
            <p>Search question in Quizzes Libarry</p>
            <div className="border-solid border-gray-300 border-[1px] flex justify-between p-3">
              <input
                className="focus:outline-none "
                type="text"
                placeholder="Search"
              />
              <button className="flex items-center border-slate-300 border-solid border-[1px] p-1 bg-slate-200">
                <CiSearch className="mr-2" />
                Search Questions
              </button>
            </div>
          </div>
          <p className="mt-5">{questions.length} questions</p>
          {questions.map((question, index) => {
            return (
              <div
                key={index}
                className="border-solid border-slate-300 p-3 border-[1px]"
              >
                <div className="flex justify-between">
                  <button className="border-slate-300 border-solid border-[1px]">
                    <IoIosMove />
                  </button>
                  <div className="flex border-solid  w-1/6">
                    <button className="flex mr-5 items-center border-solid border-slate-300 justify-center border-[1px] text-sm text-center w-1/2 hover:bg-slate-200">
                      <CiEdit className="mr-1 text-lg" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteQuestion(question._id);
                      }}
                      className="flex mr-5 items-center border-solid border-slate-300 justify-center border-[1px] text-sm text-center w-1/3  hover:bg-slate-200"
                    >
                      <CiTrash className="mr-1 text-lg" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between w-fit">
                  <p className="text-sm mr-2 font-sans">Question:</p>
                  <p className="text-sm font-sans">{question.text}</p>
                </div>

                <p className="text-sm font-sans">Answer choices:</p>
                <div className="grid grid-cols-2 w-1/4 text-sm">
                  {question.options.map((option, index) => {
                    return (
                      <div key={index} className="flex items-center  ">
                        {option.isCorrect ? (
                          <GoCheck className="text-green-600 font-extrabold" />
                        ) : (
                          <IoMdClose className="text-red-600 font-extrabold" />
                        )}
                        <p className="font-sans">{option.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <button className="font-sans border-slate-300 border-[1px] mt-3 hover:bg-slate-200 p-1">
            <Link className="font-sans" to={`/create-question/${testId}`}>
              + Add question
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestEdit;
