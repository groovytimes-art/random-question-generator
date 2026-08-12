let questions = [];

const questionElement = document.getElementById("question");
const newButton = document.getElementById("new-btn");


// Choose and display a random question
function pickRandom() {

  if (!questions.length) {
    questionElement.textContent = "No questions available.";
    return;
  }

  const index = Math.floor(Math.random() * questions.length);

  questionElement.textContent = questions[index].question;
}


// Allow Space or N to generate a new question
function enableKeyboard() {

  window.addEventListener("keydown", function (event) {

    if (event.code === "Space" || event.key.toLowerCase() === "n") {

      event.preventDefault();

      pickRandom();

    }

  });

}


// Load questions from questions.json
async function loadQuestions() {

  try {

    const response = await fetch("questions.json", {
      cache: "no-cache"
    });

    if (!response.ok) {
      throw new Error("Could not load questions.json");
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {

      questions = data.map(function (item) {

        return {
          question: String(item.question)
        };

      });

    } else {

      throw new Error("No questions found");

    }

  } catch (error) {

    questions = [
      {
        question: "What is a small change you could make today to improve your routine?"
      },
      {
        question: "If you could learn one new skill instantly, what would it be?"
      },
      {
        question: "Describe a memorable meal you had. What made it special?"
      },
      {
        question: "What is one question you wish people asked you more often?"
      },
      {
        question: "If you could travel anywhere next month, where would you go and why?"
      }
    ];

  }

  pickRandom();

}


// Button
newButton.addEventListener("click", pickRandom);


// Keyboard shortcuts
enableKeyboard();


// Start
loadQuestions();
