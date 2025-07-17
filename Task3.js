const quizData = [
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tabular Mark Language"],
    correct: 0
  },
  {
    question: "What is the output of 2 + '2' in JavaScript?",
    answers: ["4", "22", "NaN"],
    correct: 1
  },
  {
    question: "Which language runs in a web browser?",
    answers: ["Python", "Java", "JavaScript"],
    correct: 2
  }
];
let currentQuiz = 0;
let nextQuestionTimeout;
function loadQuiz() {
  clearTimeout(nextQuestionTimeout); 
  const q = quizData[currentQuiz];
  document.getElementById("question").textContent = q.question;
  const answersDiv = document.getElementById("answers");
  const feedback = document.getElementById("feedback");
  answersDiv.innerHTML = "";
  feedback.textContent = "";
  q.answers.forEach((answer, idx) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.className = "answer-btn";
    btn.onclick = () => checkAnswer(idx, btn);
    const wrapper = document.createElement("div");
    wrapper.className = "answer-wrapper";
    wrapper.appendChild(btn);
    answersDiv.appendChild(wrapper);
  });
}
function checkAnswer(selected, buttonClicked) {
  const q = quizData[currentQuiz];
  const feedback = document.getElementById("feedback");
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(btn => btn.disabled = true);

  if (selected === q.correct) {
    feedback.textContent = "✅ Correct!";
    buttonClicked.style.backgroundColor = "green";
  } else {
    feedback.textContent = "❌ Wrong!";
    buttonClicked.style.backgroundColor = "red";
    buttons[q.correct].style.backgroundColor = "green";
  }
  nextQuestionTimeout = setTimeout(() => {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      document.getElementById("quizContainer").innerHTML = "<h3>Quiz Completed! ✅</h3>";
    }
  }, 1000); 
}
loadQuiz();
