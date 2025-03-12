import { useContext, useEffect, useState } from "react";
import { QuizzContext } from "../context/ContextProvider";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CountdownTimer from "../utils/CountDownTimer";
import io from "socket.io-client";
import RoomNotExist from "../components/RoomNotExist";
import { Button, Modal } from "antd";
const MainExam = () => {
  const navigate = useNavigate();
  // This is the main exam
  const [mainExam, setMainExam] = useState({});
  ///////////////////////////////////
  const [timeLimit, setTimeLimit] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const userID = localStorage.getItem("userID");
  const role = localStorage.getItem("role");
  const { room } = useLocation().state || "";

  const { socket, setSocket } = useContext(QuizzContext);
  // student info
  const [student, setStudent] = useState(sessionStorage.getItem("student"));
  const [examID, setExamID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // room
  const [isRoomExist, setIsRoomExist] = useState(true);

  //Modal Submit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenSubmit, setIsOpenSubmit] = useState(false);

  // Final Result:
  const [finalResult, setFinalResult] = useState({
    score: 0,
    timeSubmited: new Date(),
  });

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
    // console.log("session student", JSON.parse(student));
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
      // console.log("STUDENT", inputStudent);
      sessionStorage.setItem("student", JSON.stringify(inputStudent));
      setExamID(inputStudent.examID);
      setStudentName(inputStudent.name);
      setStudentID(inputStudent.student_id);
    });
    // on event check if the room still exist ?
    socket.on("isRoomExist", (roomExist) => {
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
      setMainExam(intialExam);
      setQuestions(filteredQuestions);
      setTimeLimit(testFound.metadata.timeLimit);
    };
    fetchTest();
  }, [examID]);

  // automatic submit
  useEffect(() => {
    if (isFinished) {
      setIsModalOpen(true);
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
  };
  // calculate Score:
  const calculateScore = () => {
    const questionLength = questions.length;
    const pointsPerQuestion = parseInt(10 / questionLength);
    console.log(questionLength, pointsPerQuestion);
    let numberOfCorrectAnswers = 0;
    for (const answerIndex in mainExam) {
      console.log(answerIndex);
      if (mainExam[answerIndex].isCorrect) {
        console.log(mainExam[answerIndex]);
        numberOfCorrectAnswers += 1;
      }
    }
    const score = numberOfCorrectAnswers * pointsPerQuestion;
    console.log("Score", score);
  };

  const hanldeSubmitTest = () => {
    setIsOpenSubmit(false);
    setIsModalOpen(true);
    calculateScore();
    setStudent(null);
  };

  return isRoomExist && room ? (
    <div className="min-h-screen bg-green-400">
      {/* Final Submit Modal */}
      <Modal
        maskClosable={false}
        width={650}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        bodyStyle={{ height: "150px" }}
        okButtonProps={{
          className: "text-white",
        }} // Đổi màu nút OK[]
        footer={[]}
      >
        <div className="text-start">
          <p className="text-center text-2xl text-green-500">
            Congratulations! You have submitted your exam success!
          </p>
          <p className="text-xl">You have completed: 100% of the test</p>
          <p className="text-xl">Time Submmited: 10:00</p>
          <p className="text-xl">Your Score: 10.0</p>
        </div>
        <div className="flex justify-center">
          <Button
            className="w-1/2 custom-btn"
            key="ok"
            type="primary"
            onClick={() => {
              navigate("/home");
            }}
          >
            Return To Home
          </Button>
        </div>
      </Modal>
      {/* Open Submit Modal */}
      <Modal
        width={650}
        open={isOpenSubmit}
        onCancel={() => {
          setIsOpenSubmit(false);
        }}
        bodyStyle={{ height: "50px" }}
        okButtonProps={{
          className: "text-white",
        }} // Đổi màu nút OK[]
        footer={[
          <Button
            className="w-1/5"
            key="cancel"
            type="primary"
            onClick={() => {}}
          >
            Cancel
          </Button>,
          <Button
            className="w-1/5 custom-btn"
            key="ok"
            type="primary"
            onClick={() => {
              hanldeSubmitTest();
            }}
          >
            Submit
          </Button>,
        ]}
      >
        <p className="text-start text-2xl">
          Are you sure you want to submit your Exam ?
        </p>
      </Modal>
      <nav className="flex flex-row justify-between items-center h-[74.4px] shadow-lg bg-white mb-5">
        <div className="text-[#31cd63] text-4xl">Quizzes</div>
      </nav>

      <div className="flex w-full justify-center">
        <div className="flex flex-col  rounded-l-lg justify-start border-r border-black self-center w-3/4 min-h-screen p-5 bg-white">
          <div className="flex justify-center">
            <div className="w-full">
              <p className="text-lg font-sans">
                Question: {currentQuestion + 1}
              </p>
              <p className="text-2xl font-sans">
                {questions[currentQuestion]?.text}
              </p>
              <div className="flex flex-col gap-3 p-3">
                {questions[currentQuestion]?.options.map((answer, index) => {
                  return (
                    <button
                      className={` w-2/4 border-black p-3  text-white mr-3 hover:bg-green-400 rounded-lg ${
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
        <div className="min-h-screen bg-white rounded-r-lg">
          <div className="flex justify-between ">
            <div className=" p-4 mb-3 rounded-t-lg flex justify-center flex-col">
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
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 p-3 border-t border-black">
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
          <div className="flex justify-center">
            <button
              onClick={() => {
                setIsOpenSubmit(true);
              }}
              className="bg-green-400 hover:bg-green-500 text-white p-3 mt-3 rounded-lg"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <RoomNotExist />
  );
};

export default MainExam;
