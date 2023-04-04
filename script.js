function isAllChecked() {
  const answered = document.querySelectorAll(
    ".choice-grid:has(div.active)"
  ).length;
  const questions = document.querySelectorAll(".choice-grid").length;

  return answered === questions;
}

function uncheckAnswer(answer) {
  answer.querySelector(".checkbox").src = unchecked;
  answer.classList.remove("active");
}

function checkAnswer(answer) {
  answer.querySelector(".checkbox").src = checked;
  answer.classList.add("active");
}

function updateView(event) {
  const { currentTarget } = event;

  const otherAnswers = document.querySelectorAll(
    `.choice-grid>div[data-question-id=${currentTarget.dataset.questionId}]`
  );

  otherAnswers.forEach((answer) => {
    uncheckAnswer(answer);
  });

  checkAnswer(currentTarget);
}

function calculateResult() {
  const answers = document.querySelectorAll(".choice-grid > div.active");
  const counts = {};
  let frequentValue = null;
  let maxCount = 0;

  answers.forEach((answer) => {
    const { choiceId } = answer.dataset;
    if (counts[choiceId]) {
      counts[choiceId]++;
    } else {
      counts[choiceId] = 1;
    }

    if (counts[choiceId] > maxCount) {
      frequentValue = choiceId;
      maxCount = counts[choiceId];
    }
  });

  return frequentValue;
}

function showResult() {
  const result = calculateResult();

  const resultBox = document.querySelector(".result");
  resultBox.querySelector(".result .title").textContent =
    RESULTS_MAP[result].title;
  resultBox.querySelector(".result .contents").textContent =
    RESULTS_MAP[result].contents;

  resultBox.style.display = "block";
  resultBox.scrollIntoView({ behavior: "smooth" });
}

function clickHandle(event) {
  if (isAllChecked()) return;

  updateView(event);

  if (isAllChecked()) showResult();
}

function resetHandle(event) {
  const resultBox = document.querySelector(".result");
  resultBox.querySelector(".result .title").textContent = "";
  resultBox.querySelector(".result .contents").textContent = "";
  resultBox.style.display = "none";

  const answers = document.querySelectorAll(".choice-grid > div.active");
  answers.forEach((answer) => uncheckAnswer(answer));
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ----
// MAIN
// ----

const checked = "images/checked.png";
const unchecked = "images/unchecked.png";

const answers = document.querySelectorAll(".choice-grid>div[data-question-id]");

answers.forEach((el) => {
  el.addEventListener("click", (event) => clickHandle(event));
});

const resetBtn = document
  .querySelector(".result button.reset")
  .addEventListener("click", (event) => resetHandle(event));
