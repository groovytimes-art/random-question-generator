// Simple random question app.
// Loads questions from questions.json and displays one at random.

let questions = [];

const qEl = document.getElementById('question');
const cEl = document.getElementById('category');
const newBtn = document.getElementById('new-btn');
const countEl = document.getElementById('count');

function setStatus(msg) {
  qEl.textContent = msg;
  cEl.textContent = '';
}

function updateCount() {
  countEl.textContent = `Questions available: ${questions.length}`;
}

function pickRandom() {
  if (!questions.length) {
    setStatus('No questions available.');
    return;
  }

  const idx = Math.floor(Math.random() * questions.length);
  const item = questions[idx];

  qEl.textContent = item.question;
  cEl.textContent = item.category ? item.category : '';
}

function enableKeyboard() {
  window.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    const isTyping =
      active &&
      (active.tagName === 'INPUT' ||
       active.tagName === 'TEXTAREA' ||
       active.isContentEditable);

    if (isTyping) return;

    if (e.code === 'Space' || e.key.toLowerCase() === 'n') {
      e.preventDefault();
      pickRandom();
    }
  });
}

async function loadQuestions() {
  try {
    const resp = await fetch('questions.json', { cache: 'no-cache' });

    if (!resp.ok) {
      throw new Error('Fetch failed');
    }

    const data = await resp.json();

    if (Array.isArray(data) && data.length) {
      questions = data.map(q => ({
        question: String(q.question),
        category: q.category ? String(q.category) : ''
      }));
    }
  } catch (err) {
    questions = [
      {
        question: 'What is a small change you could make today to improve your routine?',
        category: 'Personal'
      },
      {
        question: 'If you could learn one new skill instantly, what would it be?',
        category: 'Career'
      },
      {
        question: 'Describe a memorable meal you had — what made it special?',
        category: 'Lifestyle'
      },
      {
        question: 'What’s one question you wish people asked you more often?',
        category: 'Conversation'
      },
      {
        question: 'If you could travel anywhere next month, where would you go and why?',
        category: 'Travel'
      }
    ];
  } finally {
    updateCount();
    pickRandom();
  }
}

// Button
newBtn.addEventListener('click', pickRandom);

// Keyboard shortcuts
enableKeyboard();

// Load questions
loadQuestions();
