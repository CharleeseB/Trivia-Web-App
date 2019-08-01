
function countdownTimer(){
let timeleft = 10;
    let downloadTimer = setInterval(function(){
      document.getElementById("countdown").innerHTML = timeleft + " seconds" ;
      timeleft -= 1;
      if(timeleft < 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "Finished"
      }
    }, 1000);
}
const getSetup = () => {
  const jokeUrl = "https://official-joke-api.appspot.com/random_joke";
    return fetch(jokeUrl)
    .then(function(response){
      return response.json();
    }).then(function(returnjson){
      let setup1 = returnjson.setup;
      let punchline = returnjson.punchline;
      document.querySelector(".pic-box").innerHTML= setup1;
      console.log(setup1)
    })
  }
  getSetup();

//on game start
//firstQuestion();
countdownTimer();
const url = "https://opentdb.com/api.php?amount=1&category=11&difficulty=medium&type=multiple";
      const getQuestion = () => {
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
        document.getElementById("question").innerHTML= question.question;
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
      });
      };
      function clickHandler(e){
        const answerSelected = e.srcElement.innerHTML;
        console.log(answerSelected);
        if (answerSelected === question.correct_answer){
          document.getElementById("answer-3").style.backgroundColor = "green";
          alert("correct")
        }
        else{
          document.getElementById("answer-0").style.backgroundColor = "red";
          document.getElementById("answer-1").style.backgroundColor = "red";
          document.getElementById("answer-2").style.backgroundColor = "red";
          document.getElementById("answer-3").style.backgroundColor = "green";
        }
        console.log(question)
      }

      function setup(){
        for (let i = 0; i<4;i++){
          document.getElementById("answer-"+ i).addEventListener("click", clickHandler)
        }
        
      }
      setup();
      nextQuestion();
    
