import { IoArrowBackSharp } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizzContext } from "../context/ContextProvider";

// when u save a question, also creating a new test
const CreateQuestion = () => {
  // these are the options: max 5 options, min 2 options
  const [question, setQuestion] = useState("");
  const { setState } = useContext(QuizzContext);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([
    //answer 0:
    {
      text: "",
      isCorrect: false,
    },
    {
      text: "",
      isCorrect: false,
    },
    {
      text: "",
      isCorrect: false,
    },
    {
      text: "",
      isCorrect: false,
    },
  ]);
  const handleInputChange = (index, value) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer, i) =>
        i === index ? { ...answer, text: value } : answer
      )
    );
  };
  const handleCorrectAnswer = (index) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer, i) =>
        i === index
          ? { ...answer, isCorrect: true }
          : { ...answer, isCorrect: false }
      )
    );
  };
  const handleDeleteAnswer = (index) => {
    if (answers.length <= 2) {
      console.log("Minimum 2 answers");
      return;
    }
    setAnswers((prevAnswers) => prevAnswers.filter((answer, i) => i !== index));
  };
  // phải kiểm tra có sẵn test id nào không ? nếu không thì tạo mới !
  const createQuestion = async () => {
    // create a test first then create a question, ensure there's at least 1 correct answers
    // khi xóa 1 bài test phải xóa đồng thời các câu hỏi trong đó
    if (!question || answers.length <= 0) {
      console.log("think again");
    }

    // 1. Create the test first
    const req = await fetch("http://localhost:3000/api/v1/tests", {
      method: "POST",
    });
    const res = await req.json();
    console.log(res.metadata.newTest._id);
    // 2. Add the question to that test
    const req2 = await fetch("http://localhost:3000/api/v1/questions/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        quizId: res.metadata.newTest._id.toString(),
        text: question,
        options: answers,
      }),
    });
    const res2 = await req2.json();
    console.log(res2);
  };
  return (
    <div>
      <div className="flex">
        <button
          onClick={() => {
            setState("normal");
            navigate("/home");
          }}
        >
          <IoArrowBackSharp />
        </button>
        <select name="" id="">
          <option value="0">Multiple Choice</option>
        </select>
        <nav className="w-full flex flex-row justify-end">
          <button
            onClick={() => {
              createQuestion();
            }}
            className="flex items-center bg-[#31CD63] p-2 text-white rounded-md text-sm"
          >
            <FaRegSave className="mr-1" />
            Save question
          </button>
        </nav>
      </div>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <section className="border border-black p-12 w-50% h-full  rounded-xl bg-green-400">
          <CiImageOn />
          <input
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            className="flex justify-center border border-black w-full p-10 text-center rounded-lg"
            type="text"
            placeholder="Enter Question"
          />
          <div className="flex flex-row justify-center mt-5 questions">
            {answers.map((answer, index) => {
              return (
                <div
                  key={index}
                  className="border border-black p-10 text-center w-[20%] bg-white rounded-xl mr-3"
                >
                  <div className="h-[100px]">
                    <div className="relative bottom-5 left-20">
                      <button
                        onClick={() => {
                          handleCorrectAnswer(index);
                        }}
                        className={`bg-gray-300 rounded-2xl p-1 text-white hover:bg-green-400 mr-2 ${
                          answers[index].isCorrect
                            ? "bg-green-400"
                            : "bg-gray-400"
                        }`}
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteAnswer(index);
                        }}
                        className="bg-gray-400 rounded-2xl p-1 text-white hover:bg-red-600"
                      >
                        <FaRegTrashCan />
                      </button>
                    </div>

                    <input
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="text-center w-full h-[100%]"
                      type="text"
                      placeholder="Enter Answer"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateQuestion;
