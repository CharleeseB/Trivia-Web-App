// const TriviaApp = () => {

let correct = 0;
let incorrect = 0;
let userScore = correct + incorrect;


document.querySelector('#startGame').addEventListener('click', start);

const countdownTimer = () => {
  let timeleft = 10;
  window.countdownTimer = setInterval(function(){
    document.getElementById("countdown").innerHTML = timeleft + " seconds" ;
    timeleft -= 1;
    if(timeleft < 0){
      clearInterval(window.countdownTimer);
      document.getElementById("countdown").innerHTML = "Times Up!"
      timeleft = 10;
    }
  }, 1000);
}

async function start(){
      console.log('you wanna play a game?');
      $("hidden-container2").show();
      $("header").hide();
      window.question = await getQuestion();
      countdownTimer();
      window.userScore = await setup();
      updateButtons(window.question);
      updateQuestion(window.question);
      document.getElementById("mainCard").innerHTML = "correct: " + correct;
};
function listen(){
  if(userScore === 10){
    $("hidden-container2").hide();
    }
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

    }
    });
  }
  
  getSetup();


const url = "https://opentdb.com/api.php?amount=1&category=11&difficulty=medium&type=multiple";

function getQuestion(){
  return fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(returnjson){
    let question1 = returnjson.results[0];
    question1.incorrect_answers.push(question1.correct_answer);
    question1.answers = question1.incorrect_answers;
    delete question1.incorrect_answers;
    console.log(question1);
    return question1;
  });
};

getSetup();


function updateButtons(question){
  question.answers.forEach((answer,index)=>{
    let id = "answer-"+ index;
    document.getElementById(id).innerHTML=answer;
  });
}
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
      question1.answers = question1.incorrect_answers;
      delete question1.incorrect_answers;
      return question1;
    });
}

function updateButtons(question) {
  question.answers.forEach((answer, index) => {
    let id = "answer-" + index;
    document.getElementById(id).innerHTML = answer;
  });
}
document.getElementById("answer-3").style.order = "0";
document.getElementById("answer-0").style.order = "1";
document.getElementById("answer-1").style.order = "-1";
document.getElementById("answer-2").style.order = "2";
function updateQuestion(question) {
  document.getElementById("question").innerHTML = window.question.question;
}

function nextQuestion() {
  getQuestion().then(function(response) {
    const preAnswer = document.querySelectorAll(".answer");
    preAnswer.forEach(box => {
      box.style.backgroundColor = "black";
    });
    question = response;
    updateButtons(response)
    updateQuestion(response)
    listen();
  });
}


function clickHandler(e){
  userScore = correct + incorrect;
  const answerSelected = e.srcElement.innerHTML; 
  if (answerSelected === question.correct_answer){
    document.getElementById("answer-3").style.backgroundColor = "green";
    correct ++;
//     nextQuestion();
  }
  else{
    incorrect ++ ;
    document.getElementById("answer-0").style.backgroundColor = "red";
    document.getElementById("answer-1").style.backgroundColor = "red";
    document.getElementById("answer-2").style.backgroundColor = "red";
    document.getElementById("answer-3").style.backgroundColor = "green";
//     nextQuestion();
  }
  setTimeout(nextQuestion, 1000);
  document.getElementById("mainCard").innerHTML = "correct: " + correct;
  return userScore;
}
function setup(){
    for (let i = 0; i<4;i++){
      document.getElementById("answer-"+ i).addEventListener("click", clickHandler)
    }
  }

  const storedPunchline = localStorage.getItem("punchline");

  function getPunchline(){
    return jsonPunchline;
  }

}
function setup() {
  document
    .querySelector(".question-container")
    .addEventListener("click", clickHandler);
}

setup();
nextQuestion();


