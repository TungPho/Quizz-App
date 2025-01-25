import { useState } from "react";

const App = () => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "Berlin", correct: false },
        { text: "London", correct: false },
        { text: "Madrid", correct: false },
      ],
    },
    {
      question: "What is the chemical symbol for water?",
      answers: [
        { text: "H2O", correct: true },
        { text: "CO2", correct: false },
        { text: "O2", correct: false },
        { text: "NaCl", correct: false },
      ],
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: [
        { text: "Mercury", correct: false },
        { text: "Venus", correct: false },
        { text: "Mars", correct: false },
        { text: "Jupiter", correct: true },
      ],
    },
    {
      question: "What is the chemical symbol for iron?",
      answers: [
        { text: "Fe", correct: true },
        { text: "Ag", correct: false },
        { text: "Au", correct: false },
        { text: "Cu", correct: false },
      ],
    },
    {
      question: "Which famous scientist is known for the theory of evolution?",
      answers: [
        { text: "Galileo Galilei", correct: false },
        { text: "Isaac Newton", correct: false },
        { text: "Charles Darwin", correct: true },
        { text: "Marie Curie", correct: false },
      ],
    },
    {
      question: "In which country was the game of chess invented?",
      answers: [
        { text: "China", correct: false },
        { text: "India", correct: true },
        { text: "Greece", correct: false },
        { text: "Egypt", correct: false },
      ],
    },

    {
      question: "Which gas is responsible for the Earth's ozone layer?",
      answers: [
        { text: "Oxygen", correct: false },
        { text: "Carbon Dioxide", correct: false },
        { text: "Nitrogen", correct: false },
        { text: "Ozone", correct: true },
      ],
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Mars", correct: true },
        { text: "Venus", correct: false },
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: false },
      ],
    },
    {
      question: "Which gas do plants use for photosynthesis?",
      answers: [
        { text: "Oxygen", correct: false },
        { text: "Carbon Dioxide", correct: true },
        { text: "Nitrogen", correct: false },
        { text: "Helium", correct: false },
      ],
    },

    {
      question: "What is the capital of Japan?",
      answers: [
        { text: "Beijing", correct: false },
        { text: "Tokyo", correct: true },
        { text: "Seoul", correct: false },
        { text: "Bangkok", correct: false },
      ],
    },
    {
      question:
        "Which famous scientist developed the theory of general relativity?",
      answers: [
        { text: "Isaac Newton", correct: false },
        { text: "Albert Einstein", correct: true },
        { text: "Nikola Tesla", correct: false },
        { text: "Marie Curie", correct: false },
      ],
    },
    {
      question: "Which country is known as the 'Land of the Rising Sun'?",
      answers: [
        { text: "China", correct: false },
        { text: "Japan", correct: true },
        { text: "India", correct: false },
        { text: "Egypt", correct: false },
      ],
    },

    {
      question: "What is the chemical symbol for gold?",
      answers: [
        { text: "Ag", correct: false },
        { text: "Au", correct: true },
        { text: "Fe", correct: false },
        { text: "Hg", correct: false },
      ],
    },
    {
      question:
        "Which planet is known as the 'Morning Star' or 'Evening Star'?",
      answers: [
        { text: "Mars", correct: false },
        { text: "Venus", correct: true },
        { text: "Mercury", correct: false },
        { text: "Neptune", correct: false },
      ],
    },

    {
      question: "What is the smallest prime number?",
      answers: [
        { text: "1", correct: false },
        { text: "2", correct: true },
        { text: "3", correct: false },
        { text: "5", correct: false },
      ],
    },
    {
      question: "Which country is known as the 'Land of the Rising Sun'?",
      answers: [
        { text: "China", correct: false },
        { text: "South Korea", correct: false },
        { text: "Japan", correct: true },
        { text: "Thailand", correct: false },
      ],
    },
    {
      question: "What is the largest ocean on Earth?",
      answers: [
        { text: "Atlantic Ocean", correct: false },
        { text: "Indian Ocean", correct: false },
        { text: "Arctic Ocean", correct: false },
        { text: "Pacific Ocean", correct: true },
      ],
    },
    {
      question: "Which element has the chemical symbol 'K'?",
      answers: [
        { text: "Krypton", correct: false },
        { text: "Potassium", correct: true },
        { text: "Kryptonite", correct: false },
        { text: "Kallium", correct: false },
      ],
    },
    {
      question: "What is the capital city of India?",
      answers: [
        { text: "Mumbai", correct: false },
        { text: "New Delhi", correct: true },
        { text: "Bangalore", correct: false },
        { text: "Kolkata", correct: false },
      ],
    },
  ];

  const onLoginHandle = (e) => {
    e.preventDefault();
    if (room && name && studentID) {
      setIsLogin(true);
    }
  };

  const onChangeQuestionHandler = (e, index) => {
    e.preventDefault();
    setCurrentQuestion(index);
  };
  return !isLogin ? (
    <div>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        value={name}
        placeholder="Enter Your name:"
      />
      <input
        onChange={(e) => setStudentID(e.target.value)}
        type="text"
        value={studentID}
        placeholder="Enter student id:"
      />
      <input
        onChange={(e) => setRoom(e.target.value)}
        type="text"
        value={room}
        placeholder="Enter room id"
      />
      <button onClick={onLoginHandle}>Submit</button>
    </div>
  ) : (
    <div>
      <p>Welcome {name}</p>
      <p>Mã sinh viên: {studentID}</p>
      <p>Room: {room}</p>
      {questions.map((quest, index) => {
        return (
          <button
            className="pick-question-btn"
            onClick={(e) => {
              onChangeQuestionHandler(e, index);
            }}
            key={index + 1}
          >
            {index + 1}
          </button>
        );
      })}
      <p>Current Question: {currentQuestion + 1}</p>
      <p>{questions[currentQuestion].question}</p>
      <p>Options</p>
      {questions[currentQuestion].answers.map((answer, index) => {
        return (
          <button
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
  );
};

export default App;
