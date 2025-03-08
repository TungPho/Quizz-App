import { useContext, useEffect, useState } from "react";
import { QuizzContext } from "../context/ContextProvider";
import { useLocation } from "react-router-dom";
import CountdownTimer from "../utils/CountDownTimer";
import io from "socket.io-client";
import RoomNotExist from "../components/RoomNotExist";
const MainExam = () => {
  // This is the main exam
  const [mainExam, setMainExam] = useState({});
  ///////////////////////////////////
  const [timeLimit, setTimeLimit] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isOpenSubmit, setIsOpenSubmit] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const userID = localStorage.getItem("userID");
  const role = localStorage.getItem("role");
  const { room } = useLocation().state;

  const { socket, setSocket } = useContext(QuizzContext);
  // student info
  const [student, setStudent] = useState(localStorage.getItem("student"));
  const [examID, setExamID] = useState(localStorage.getItem("examID"));
  const [studentName, setStudentName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  // room
  const [isRoomExist, setIsRoomExist] = useState(true);

  useEffect(() => {
    setSocket(
      io("ws://localhost:3000", {
        query: { userId: userID, role }, // Gửi userId và role khi kết nối
      })
    );
  }, [role, setSocket, userID]);

  useEffect(() => {
    // get student information (OK)
    console.log(userID, room, examID);

    socket.emit("studentInfo", userID, room);
    socket.emit("checkRoomExist", room);
    // recived student information in server
    console.log("session student", JSON.parse(student));
    const objStudent = JSON.parse(student);
    // if there's nothing in the session storage
    if (objStudent) {
      setExamID(objStudent.examID);
      setStudentName(objStudent.name);
      setStudentID(objStudent.student_id);
    }
  }, [examID, room, socket, student, userID]);

  useEffect(() => {
    // on event receive the student info
    socket.on("sentStudentInfo", (inputStudent) => {
      console.log("STUDENT", inputStudent);
      localStorage.setItem("student", JSON.stringify(inputStudent));
      setExamID(inputStudent.examID);
      setStudentName(inputStudent.name);
      setStudentID(inputStudent.student_id);
    });
    // on event check if the room still exist ?
    socket.on("isRoomExist", (roomExist) => {
      console.log(roomExist ? "Exist" : "Room not exist");
      setIsRoomExist(roomExist);
    });
    return () => {
      socket.off("sentStudentInfo");
    };
  }, [socket]);

  useEffect(() => {
    // fetch the exam by exam ID
    const fetchTest = async () => {
      if (!examID) return;
      console.log("exam", examID);
      const req = await fetch(`http://localhost:3000/api/v1/tests/${examID}`);
      const testFound = await req.json();

      //loop over the questions in the test
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
      const intialExam = {};
      filteredQuestions.forEach((q, index) => {
        intialExam[index] = {
          optionSelected: "none",
          isSelected: false,
          isCorrect: false,
        };
      });
      console.log(intialExam);
      setMainExam(intialExam);
      setQuestions(filteredQuestions);
      setTimeLimit(testFound.metadata.timeLimit);
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

  const handleSelectAnswer = (index) => {
    setMainExam((prev) => ({
      ...prev,
      [currentQuestion]: {
        optionSelected: index,
        isSelected: true,
        isCorrect: questions[currentQuestion].options[index].isCorrect,
      },
    }));
    console.log(mainExam);
  };

  return isRoomExist && room ? (
    <div className="min-h-screen bg-green-400">
      <div className={`flex justify-center ${isOpenSubmit ? "" : "hidden"}`}>
        <div className="absolute bg-white p-3 top-[120px] border border-black">
          <p className="text-xl">Are you sure you want to submit your exam ?</p>
          <div className="flex justify-between mt-3">
            <button
              onClick={() => {
                setIsOpenSubmit(false);
              }}
              className="bg-slate-400 hover:bg-slate-500 text-white p-2"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert("Submit");
              }}
              className="bg-green-400 hover:bg-green-500 text-white p-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between ">
        <div className=" p-4 mb-3 bg-white flex justify-center flex-col">
          <p className="font-sans font-semibold">Room: {room}</p>
          <p className="font-sans">
            Name: <b>{studentName}</b>
          </p>
          <p className="font-sans">
            StudentID: <b>{studentID}</b>
          </p>
          <p>Time Left:</p>
          <div className="text-3xl mr-10">
            {timeLimit ? (
              <CountdownTimer
                minutes={timeLimit}
                setIsFinished={setIsFinished}
              />
            ) : (
              ""
            )}
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
                className={`  text-white h-fit p-2 rounded-3xl w-full mr-3 hover:bg-green-400 ${
                  mainExam[index].isSelected || currentQuestion === index
                    ? "bg-green-400"
                    : "bg-slate-400"
                }`}
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
              <p className="text-2xl font-sans">
                {questions[currentQuestion]?.text}
              </p>

              <div className="flex  p-3">
                {questions[currentQuestion]?.options.map((answer, index) => {
                  return (
                    <button
                      className={` w-2/4 border-black p-3  text-white mr-3 hover:bg-green-400 ${
                        mainExam[currentQuestion].isSelected &&
                        mainExam[currentQuestion].optionSelected === index
                          ? "bg-green-400"
                          : "bg-gray-400"
                      }`}
                      onClick={() => {
                        handleSelectAnswer(index);
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
  ) : (
    <RoomNotExist />
  );
};

export default MainExam;
