import { useContext, useEffect, useRef, useState } from "react";
import { QuizzContext } from "../context/ContextProvider";
import { useLocation } from "react-router-dom";
import CountdownTimer from "../utils/CountDownTimer";
const API_URL = import.meta.env.LOCAL_API_CALL_URL;

const MainExam = () => {
  const [examID, setExamID] = useState(sessionStorage.getItem("examID"));
  const [student, setStudent] = useState(sessionStorage.getItem("student"));
  const [mainExam, setMainExam] = useState(null);
  const [timeLimit, setTimeLimit] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isOpenSubmit, setIsOpenSubmit] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const userID = sessionStorage.getItem("userID");
  const { room } = useLocation().state;
  const { socket } = useContext(QuizzContext);
  // student info
  const [studentName, setStudentName] = useState("");
  const [studentID, setStudentID] = useState("");
  console.log(API_URL);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  useEffect(() => {
    // get student information
    if (!examID || !studentName) {
      socket.emit("studentInfo", userID, room);
      // recived student information in server
      socket.on("sentStudentInfo", (student) => {
        console.log(student);
        sessionStorage.setItem("student", student);
        setExamID(student.examID);
        setStudentName(student.name);
        setStudentID(student.student_id);
      });
    }
  }, [examID, mainExam, room, socket, studentName, userID]);

  useEffect(() => {
    // fetch the exam by exam ID
    const fetchTest = async () => {
      const req = await fetch(`http://localhost:3000/api/v1/tests/${examID}`);
      const testFound = await req.json();
      setMainExam(testFound.metadata);
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

      // filtered null questions
      const filteredQuestions = allQuestions.filter((q) => q);
      console.log(filteredQuestions);
      setQuestions(filteredQuestions);
    };
    fetchTest();
  }, [examID]);

  useEffect(() => {
    if (isFinished) {
      console.log("Finish");
    }
  }, [isFinished]);

  const onChangeQuestionHandler = (e, index) => {
    setCurrentQuestion(index);
  };
  return (
    <div className="min-h-screen bg-green-400">
      <div className={`flex justify-center ${isOpenSubmit ? "" : "hidden"}`}>
        <div className="absolute bg-white p-3 top-[120px] border border-black">
          <p className="text-xl">Are you sure you want to submit your exam ?</p>
          <div className="flex justify-between mt-3">
            <button
              onClick={() => {
                setIsOpenSubmit(false);
              }}
              className="bg-slate-400 hover:bg-slate-500 text-white p-2 "
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert("Submit");
              }}
              className="bg-green-400 hover:bg-green-500 text-white p-2 "
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between ">
        <div className=" p-4 mb-3 bg-white flex justify-center flex-col">
          <p className="font-sans">
            Name: <b>{studentName}</b>
          </p>
          <p className="font-sans">
            StudentID: <b>{studentID}</b>
          </p>
          <p>Time Left:</p>
          <div className="text-3xl mr-10">
            <CountdownTimer minutes={1} setIsFinished={setIsFinished} />
          </div>
          <button
            onClick={() => {
              setIsOpenSubmit(true);
            }}
            className="bg-slate-400 hover:bg-slate-500 text-white p-3 mt-3"
          >
            Submit Exam
          </button>
        </div>
      </div>

      <div className="flex w-full justify-center min-h-screen ">
        <div className="grid grid-cols-3 gap-5 p-3  border border-black bg-white">
          {questions.map((quest, index) => {
            return (
              <button
                className=" bg-slate-400 text-white h-fit p-2 rounded-3xl w-full mr-3 hover:bg-green-400"
                onClick={(e) => {
                  onChangeQuestionHandler(e, index);
                }}
                key={index + 1}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col justify-start border-t border-r border-black self-center w-2/3 min-h-screen p-5 bg-white">
          <div className="flex justify-center ">
            <div className="w-full">
              <p className="text-lg font-sans">
                Current Question: {currentQuestion + 1}
              </p>
              <p className="text-2xl font-sans">{questions[0]?.text}</p>

              <div className="flex  p-3">
                {questions[currentQuestion]?.options.map((answer, index) => {
                  return (
                    <button
                      className=" w-2/4 border-black p-3 bg-gray-400 text-white mr-3 hover:bg-green-400"
                      onClick={() => {
                        console.log(`Selected ${index + 1}`);
                      }}
                      key={index}
                    >
                      {answer.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainExam;
