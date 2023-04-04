function uncheckAnswer(answer) {
  answer.querySelector(".checkbox").src = unchecked;
  answer.classList.remove("active");
}

function checkAnswer(answer) {
  answer.querySelector(".checkbox").src = checked;
  answer.classList.add("active");
}

function clickHandle(event) {
  const answered = document.querySelectorAll(
    ".choice-grid:has(div.active)"
  ).length;
  const questions = document.querySelectorAll(".choice-grid").length;
  if (answered == questions) return;

  const { currentTarget } = event;

  const otherAnswers = document.querySelectorAll(
    `.choice-grid>div[data-question-id=${currentTarget.dataset.questionId}]`
  );

  otherAnswers.forEach((answer) => {
    uncheckAnswer(answer);
  });

  checkAnswer(currentTarget);
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
