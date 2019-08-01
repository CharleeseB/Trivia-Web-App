let correct = 0;
let incorrect = 0;

function start(){
      console.log('you wanna play a game?');
      $("hidden-container2").show();
      $("header").hide();
      countdownTimer();
      document.getElementById("mainCard").innerHTML = "correct: " + correct;
};
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


function countdownTimer(){
let timeleft = 10;
    let downloadTimer = setInterval(function(){
      document.getElementById("countdown").innerHTML = timeleft + " seconds" ;
      timeleft -= 1;
      if(timeleft < 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "Moving On.."
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


// function hideGame(){
//   startGame.addEventListener("click",function(i){
//     console.log("glakjfd")
//     hideQ.style.display === "none";
//     }
//   });
//on game start
//firstQuestion();
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
        let correct = 0;
        let incorrect = 0;
        const answerSelected = e.srcElement.innerHTML;
        console.log(answerSelected);
        if (answerSelected === question.correct_answer){

        }
}
      

          document.getElementById("answer-3").style.backgroundColor = "green";
          alert("correct")
          correct += 1;
        }
        else{
          incorrect += 1;
        }
        document.getElementById("mainCard").innerHTML = "correct: " + correct;
        console.log(correct)
        
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

const storedPunchline = localStorage.getItem("punchline");


function getPunchline (){
 return jsonPunchline;
}
