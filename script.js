function uncheckAnswer(answer) {
  answer.querySelector(".checkbox").src = unchecked;
  answer.classList.remove("active");
}

function checkAnswer(answer) {
  answer.querySelector(".checkbox").src = checked;
  answer.classList.add("active");
}

function clickHandle(event) {
  const { currentTarget } = event;

  const otherAnswers = document.querySelectorAll(
    `.choice-grid>div[data-question-id=${currentTarget.dataset.questionId}]`
  );

  // Uncheck all
  otherAnswers.forEach((answer) => {
    uncheckAnswer(answer);
  });
  console.log(otherAnswers);

  // Check Clicked
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
