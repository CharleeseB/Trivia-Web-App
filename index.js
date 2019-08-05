function trivia() {
  let correct = 0;
  let incorrect = 0;
  let questionCount = 0;

  document.querySelector("#startGame").addEventListener("click", start);
  document.querySelector("#endGame").addEventListener("click", newGame);
  async function start() {
    $("hidden-container2").show();
    $("header").hide();
    window.question = await getQuestion();
    countdownTimer();
    await setup();
    updateButtons(window.question);
    updateQuestion(window.question);
    document.getElementById("mainCard").innerHTML = "correct: " + correct;
  }
  function newGame() {
    location.reload();
  }

  function listen() {
    if (questionCount === 10) {
      $("hidden-container2").hide();
      $("aftergame").show();
      userScoreStore();
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
        $("hidden-container2").hide();
        $("aftergame").show();
        userScoreStore();
        //document.getElementById("countdown").innerHTML = "Game Over!";
      }
      return timeleft;
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
    "https://opentdb.com/api.php?amount=1&category=11&difficulty=hard&type=multiple";

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
        box.style.backgroundColor = "orange";
      });
      question = response;
      updateButtons(response);
      updateQuestion(response);
      listen();
    });
  }

  function clickHandler(e) {
    if (e.srcElement.className !== "answer") return;
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
    questionCount = correct + incorrect;
    setTimeout(nextQuestion, 1000);
    setTimeout(getSetup, 1000);

    document.getElementById("mainCard").innerHTML = "correct: " + correct;
    return questionCount;
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

  function userScoreStore() {
    localStorage.setItem("score", correct);
  }

  function userScoreGrab() {
    console.log(userSavedScore);
  }
  setup();
  nextQuestion();
}
trivia();
