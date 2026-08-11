// Random Question Generator
// Loads questions from questions.json and displays one at random.

let questions = [];

const questionElement = document.getElementById("question");
const categoryElement = document.getElementById("category");
const newButton = document.getElementById("new-btn");


// Choose and display a random question
function pickRandom() {
  if (!questions.length) {
    questionElement.textContent = "No questions available.";
    categoryElement.textContent = "";
    return;
  }

  const index = Math.floor(Math.random() * questions.length);
  const item = questions[index];

  questionElement.textContent = item.question;
  categoryElement.textContent = item.category || "";
}


// Allow Space or N to generate a new question
function enableKeyboard() {
  window.addEventListener("keydown", function (event) {
    const active = document.activeElement;

    const isTyping =
      active &&
      (
        active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.isContentEditable
      );

    if (isTyping) {
      return;
    }

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
          question: String(item.question),
          category: item.category
            ? String(item.category)
            : ""
        };
      });
    } else {
      throw new Error("No questions found");
    }

  } catch (error) {

    // Backup questions in case questions.json cannot be loaded
    questions = [
      {
        question: "What is a small change you could make today to improve your routine?",
        category: "Personal"
      },
      {
        question: "If you could learn one new skill instantly, what would it be?",
        category: "Career"
      },
      {
        question: "Describe a memorable meal you had. What made it special?",
        category: "Lifestyle"
      },
      {
        question: "What is one question you wish people asked you more often?",
        category: "Conversation"
      },
      {
        question: "If you could travel anywhere next month, where would you go and why?",
        category: "Travel"
      }
    ];
  }

  // Display the first random question when the page loads
  pickRandom();
}


// Button
newButton.addEventListener("click", pickRandom);


// Keyboard shortcuts
enableKeyboard();


// Start the application
loadQuestions();
