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

// function startNew(){
//   document.getElementById("mainCard").innerHTML = "correct: " + correct;
//   countdownTimer();

// }
  
    // setTimeout(function(){
    // nextQuestion
    // }, delay);
    // startNew();}


// function answerCounter(){
//   let correct = 0;
//   let incorrect = 0;
  
// }




      // return downloadTimer;
      // return timeleft;

const getSetup = () => {
  const jokeUrl = "https://official-joke-api.appspot.com/random_joke";
    return fetch(jokeUrl)
    .then(function(response){
      return response.json();
    }).then(function(returnjson){
      let setup1 = returnjson.setup;
      let punchline = returnjson.punchline;



      document.querySelector(".pic-box").innerHTML= setup1+ " " + punchline;
      localStorage.setItem("punchline", returnjson.punchline);
      const jsonPunchline = () =>{localStorage.parse("punchline");
        const storedPunchline = localStorage.getItem("punchline");
        alert("storedPunchline");
    }
      console.log(setup1);
    })
  }
  
  getSetup();
  // listen();



// function hideGame(){
//   startGame.addEventListener("click",function(i){
//     console.log("glakjfd")
//     hideQ.style.display === "none";
//     }
//   });

//on game start
//firstQuestion();
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


function updateButtons(question){
  question.answers.forEach((answer,index)=>{
    let id = "answer-"+ index;
    document.getElementById(id).innerHTML=answer;
    console.log(answer, index);
  })
}

function updateQuestion(question){
  document.getElementById("question").innerHTML= window.question.question;
  // countdownTimer();
} 


function randNum (low,hi){
  return Math.floor(Math.random() * hi) + low; 
};


function nextQuestion(){
  getQuestion().then(function(response){
    const preAnswer = document.querySelectorAll(".answer");
    preAnswer.forEach(box =>{
      box.style.backgroundColor = "black";
    })
    question = response;
    updateButtons(response)
    updateQuestion(response)
    listen();
  });
};


function clickHandler(e){
  userScore = correct + incorrect;
  // for (let incorrect = 0; incorrect < 10; incorrect ++){
  //   console.log(incorrect);
  const answerSelected = e.srcElement.innerHTML;
  // clearInterval(window.countdownTimer);
  // console.log(answerSelected);
  // console.log(window.question.correct_answer)
  
  if (answerSelected === question.correct_answer){
    document.getElementById("answer-3").style.backgroundColor = "green";
    correct ++;
    console.log(correct)
    console.log(userScore)
    nextQuestion();
  }
  else{
    incorrect ++ ;
    document.getElementById("answer-0").style.backgroundColor = "red";
    document.getElementById("answer-1").style.backgroundColor = "red";
    document.getElementById("answer-2").style.backgroundColor = "red";
    document.getElementById("answer-3").style.backgroundColor = "green";
    nextQuestion();
    console.log(incorrect)
    console.log(userScore)
  }
  document.getElementById("mainCard").innerHTML = "correct: " + correct;
  return userScore;

  // currentScore = correct - incorrect;
  // clearInterval(window.countdownTimer)
}
function setup(){
    for (let i = 0; i<4;i++){
      document.getElementById("answer-"+ i).addEventListener("click", clickHandler)
    }
    
  }


  // function movingOn(timeleft){
  //   if (timeleft < 0){
  //   nextQuestion()};
  // }

  // setup();
  // nextQuestion();

  const storedPunchline = localStorage.getItem("punchline");

  function getPunchline(){
    return jsonPunchline;
  }

// }