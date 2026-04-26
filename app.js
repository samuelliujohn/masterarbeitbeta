const tasks = [
  {
    title: "Aufgabe 1 · Sprache",
    prompt: "Welcher Satz ist grammatikalisch korrekt?",
    options: [
      "Maya gehen heute in die Bibliothek.",
      "Maya geht heute in die Bibliothek.",
      "Maya gingt heute in die Bibliothek.",
    ],
    answer: 1,
    clue: "Hinweis A: Maya war in der Nähe vieler Bücher.",
  },
  {
    title: "Aufgabe 2 · Logik",
    prompt: "Wenn 2, 4, 8, 16, ... wie lautet die nächste Zahl?",
    options: ["18", "24", "32"],
    answer: 2,
    clue: "Hinweis B: Maya liebt Muster und Zahlen.",
  },
  {
    title: "Aufgabe 3 · Orientierung",
    prompt:
      "Maya startet am Eingang. Sie geht 2 Felder nach Osten und 1 Feld nach Norden. Wo ist sie?",
    options: ["Bei der Cafeteria", "Beim Labor", "Im Medienraum"],
    answer: 1,
    clue: "Hinweis C: Der gesuchte Ort hat Computerarbeitsplätze.",
  },
];

const KEY = "wo-ist-maya-v2-state";

const state = loadState();

const taskTitle = document.getElementById("taskTitle");
const taskPrompt = document.getElementById("taskPrompt");
const answersEl = document.getElementById("answers");
const answerForm = document.getElementById("answerForm");
const feedback = document.getElementById("feedback");
const clueList = document.getElementById("clueList");
const badge = document.getElementById("badge");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");
const resetBtn = document.getElementById("resetBtn");

render();

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (state.currentTask >= tasks.length) {
    return;
  }

  const selected = Number(
    new FormData(answerForm).get("answer")
  );

  if (Number.isNaN(selected)) {
    showFeedback("Bitte wähle zuerst eine Antwort aus.", false);
    return;
  }

  const task = tasks[state.currentTask];

  if (selected === task.answer) {
    state.clues.push(task.clue);
    state.currentTask += 1;
    persistState();

    showFeedback("Richtig! Du hast einen Hinweis erhalten.", true);

    setTimeout(() => {
      render();
      feedback.textContent = "";
    }, 500);
  } else {
    showFeedback("Leider falsch. Versuch es erneut.", false);
  }
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem(KEY);
  state.currentTask = 0;
  state.clues = [];
  render();
  showFeedback("Spielstand zurückgesetzt.", true);
});

function render() {
  renderClues();
  renderProgress();

  if (state.currentTask >= tasks.length) {
    renderComplete();
    return;
  }

  const task = tasks[state.currentTask];
  taskTitle.textContent = task.title;
  taskPrompt.textContent = task.prompt;

  answersEl.innerHTML = "";
  task.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "answer-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = String(index);

    const text = document.createElement("span");
    text.textContent = option;

    label.append(input, text);
    answersEl.append(label);
  });

  badge.textContent = `Hinweise: ${state.clues.length}/${tasks.length}`;
}

function renderClues() {
  clueList.innerHTML = "";

  if (state.clues.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Noch keine Hinweise gesammelt.";
    clueList.append(li);
    return;
  }

  state.clues.forEach((clue) => {
    const li = document.createElement("li");
    li.textContent = clue;
    clueList.append(li);
  });
}

function renderProgress() {
  const percent = Math.round((state.currentTask / tasks.length) * 100);
  progress.value = percent;
  progressText.textContent = `${percent}%`;
}

function renderComplete() {
  taskTitle.textContent = "Finale";
  taskPrompt.textContent = "Du hast alle Aufgaben abgeschlossen.";
  answersEl.innerHTML = "";
  badge.textContent = `Hinweise: ${tasks.length}/${tasks.length}`;

  const existing = document.querySelector(".result-card");
  if (!existing) {
    const template = document.getElementById("resultTemplate");
    const node = template.content.cloneNode(true);
    node.getElementById("resultText").textContent =
      "Maya wurde im Medienraum gefunden. Super gemacht!";
    document.body.append(node);
  }
}

function showFeedback(message, ok) {
  feedback.textContent = message;
  feedback.className = `feedback ${ok ? "good" : "bad"}`;
}

function loadState() {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    return { currentTask: 0, clues: [] };
  }

  try {
    const parsed = JSON.parse(raw);
    const currentTask = Number(parsed.currentTask);
    const clues = Array.isArray(parsed.clues) ? parsed.clues : [];

    return {
      currentTask: Number.isInteger(currentTask) ? currentTask : 0,
      clues,
    };
  } catch {
    return { currentTask: 0, clues: [] };
  }
}

function persistState() {
  localStorage.setItem(KEY, JSON.stringify(state));
}
