# Random Question Generator

A small static site (HTML/CSS/JS) that displays a random question from a JSON question bank.

How to view
- Open index.html in a browser (or enable GitHub Pages on the repository).
- Click "New Question" or press Space / N to get another question.
- Click "Add Local Question" to add a question for the current page session (not persisted to the repo).

Editing questions
- To change the default questions, edit `questions.json` in the repository and commit.
- Added questions via the UI are stored only in-memory for the current page session.

Files
- index.html — main UI (already added)
- styles.css — page styles
- script.js — app logic (loads questions.json, picks random)
- questions.json — sample question bank
- README.md — this file

License
- CC0 / public domain (or choose whatever you prefer for the repo)
