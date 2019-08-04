let correct = 0;
let incorrect = 0;
let userScore = correct + incorrect;

document.querySelector("#startGame").addEventListener("click", start);

async function start() {
  console.log("you wanna play a game?");
  $("hidden-container2").show();
  $("header").hide();
  window.question = await getQuestion();
  countdownTimer();
  window.userScore = await setup();
  updateButtons(window.question);
  updateQuestion(window.question);
  document.getElementById("mainCard").innerHTML = "correct: " + correct;
}
function listen() {
  if (userScore === 10) {
    $("hidden-container2").hide();
  }
  document.getElementById("mainCard").innerHTML = "correct: " + correct;
}

function countdownTimer() {
  let timeleft = 60;
  let downloadTimer = setInterval(function() {
    document.getElementById("countdown").innerHTML = timeleft + " seconds";
    timeleft -= 1;
    if (timeleft < 0) {
      clearInterval(downloadTimer);
      document.getElementById("countdown").innerHTML = "Game Over!";
    }
  }, 1000);
}

const getSetup = () => {
  const jokeUrl = "https://official-joke-api.appspot.com/random_joke";
  return fetch(jokeUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(returnjson) {
      let setup1 = returnjson.setup;
      let punchline = returnjson.punchline;

      document.querySelector(".pic-box").innerHTML = setup1 + " " + punchline;
      localStorage.setItem("punchline", returnjson.punchline);
      const jsonPunchline = () => {
        localStorage.parse("punchline");
        const storedPunchline = localStorage.getItem("punchline");
        alert("storedPunchline");
      };
    });
};

getSetup();

const url =
  "https://opentdb.com/api.php?amount=1&category=11&difficulty=medium&type=multiple";

function getQuestion() {
  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(returnjson) {
      let question1 = returnjson.results[0];
      question1.incorrect_answers.push(question1.correct_answer);
      question1.answers = shuffle(question1.incorrect_answers);
      delete question1.incorrect_answers;
      console.log(question1);
      return question1;
    });
}
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// getSetup();

function updateButtons(question) {
  question.answers.forEach((answer, index) => {
    let id = "answer-" + index;
    document.getElementById(id).innerHTML = answer;
  });
}

function updateButtons(question) {
  question.answers.forEach((answer, index) => {
    let id = "answer-" + index;
    document.getElementById(id).innerHTML = answer;
  });
}
function updateQuestion(question) {
  document.getElementById("question").innerHTML = question.question;
}

function nextQuestion() {
  getQuestion().then(function(response) {
    const preAnswer = document.querySelectorAll(".answer");
    preAnswer.forEach(box => {
      box.style.backgroundColor = "black";
    });
    question = response;
    updateButtons(response);
    updateQuestion(response);
    listen();
  });
}

function clickHandler(e) {
  if (e.srcElement.className !== "answer") return;
  userScore = correct + incorrect;
  const answerSelected = e.srcElement.innerHTML;
  if (answerSelected === question.correct_answer) {
    e.srcElement.style.backgroundColor = "green";
    correct++;
  } else {
    let search = document.querySelectorAll(".answer");
    search.forEach(box => {
      if (box.innerHTML === question.correct_answer) {
        box.style.backgroundColor = "green";
      } else {
        box.style.backgroundColor = "red";
      }
    });
    incorrect++;
  }

  setTimeout(nextQuestion, 1000);

  document.getElementById("mainCard").innerHTML = "correct: " + correct;
  return userScore;
}
function setup() {
  for (let i = 0; i < 4; i++) {
    document
      .getElementById("answer-" + i)
      .addEventListener("click", clickHandler);
  }
}

const storedPunchline = localStorage.getItem("punchline");

function getPunchline() {
  return jsonPunchline;
}

function setup() {
  document
    .querySelector(".question-container")
    .addEventListener("click", clickHandler);
}
