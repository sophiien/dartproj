const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scorebox = document.querySelector("#score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "2 + 2",
    choice1: "2",
    choice2: "4",
    choice3: "21",
    choice4: "17",
    answer: 2,
  },
  {
    question: "11 x 12",
    choice1: "122",
    choice2: "132",
    choice3: "142",
    choice4: "112",
    answer: 2,
  },
  {
    question: "44 - 32",
    choice1: "12",
    choice2: "22",
    choice3: "10",
    choice4: "11",
    answer: 1,
  },
];

var startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

var getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > 3) {
    document.write(
      '<font size="20" color="blue" face="Book Antiqua" weight="2" >' +
        `Your score is ${score} out of 3` +
        "</font>"
    );
  }

  questionCounter++;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  // @ts-ignore
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    // @ts-ignore
    const number = choice.dataset["number"];
    // @ts-ignore
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    // @ts-ignore
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore();
    }

    // @ts-ignore
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      // @ts-ignore
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

var incrementScore = () => {
  score++;
};

startGame();
