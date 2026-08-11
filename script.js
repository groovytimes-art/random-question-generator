// Simple random question app (pure random). Loads questions.json from same folder.
let questions = [];
const qEl = document.getElementById('question');
const cEl = document.getElementById('category');
const newBtn = document.getElementById('new-btn');
const addLocalBtn = document.getElementById('add-local-btn');
const addForm = document.getElementById('add-form');
const addText = document.getElementById('new-question-text');
const addCategory = document.getElementById('new-question-category');
const cancelAdd = document.getElementById('cancel-add');
const countEl = document.getElementById('count');

function setStatus(msg){
  qEl.textContent = msg;
  cEl.textContent = '';
}

function updateCount(){
  countEl.textContent = `Questions available: ${questions.length}`;
}

function pickRandom(){
  if (!questions.length) {
    setStatus('No questions available.');
    return;
  }
  const idx = Math.floor(Math.random() * questions.length);
  const item = questions[idx];
  qEl.textContent = item.question;
  cEl.textContent = item.category ? item.category : '';
}

function enableKeyboard(){
  window.addEventListener('keydown', (e)=>{
    const active = document.activeElement;
    const isTyping = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
    if (isTyping) return;
    if (e.code === 'Space' || e.key.toLowerCase() === 'n'){
      e.preventDefault();
      pickRandom();
    }
  });
}

async function loadQuestions(){
  try {
    const resp = await fetch('questions.json', {cache:'no-cache'});
    if (!resp.ok) throw new Error('Fetch failed');
    const data = await resp.json();
    if (Array.isArray(data) && data.length) {
      questions = data.map(q => ({question: String(q.question), category: q.category ? String(q.category) : ''}));
    }
  } catch (err) {
    // fallback sample if fetch fails
    questions = [
      {question: 'What is a small change you could make today to improve your routine?', category: 'Personal'},
      {question: 'If you could learn one new skill instantly, what would it be?', category: 'Career'},
      {question: 'Describe a memorable meal you had — what made it special?', category: 'Lifestyle'},
      {question: 'What’s one question you wish people asked you more often?', category: 'Conversation'},
      {question: 'If you could travel anywhere next month, where would you go and why?', category: 'Travel'}
    ];
  } finally {
    updateCount();
    pickRandom();
  }
}

// UI wiring
newBtn.addEventListener('click', pickRandom);
addLocalBtn.addEventListener('click', ()=> addForm.classList.toggle('hidden'));
cancelAdd.addEventListener('click', ()=>{
  addForm.classList.add('hidden');
  addText.value = '';
  addCategory.value = '';
});
addForm.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const text = addText.value.trim();
  if (!text) return;
  const cat = addCategory.value.trim();
  questions.push({question:text, category:cat});
  addText.value = '';
  addCategory.value = '';
  addForm.classList.add('hidden');
  updateCount();
  // show the newly added question immediately
  qEl.textContent = text;
  cEl.textContent = cat;
});

enableKeyboard();
loadQuestions();
