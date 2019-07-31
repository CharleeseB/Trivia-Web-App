
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

//on game start
//firstQuestion();
countdownTimer();

// document.addEventListener("DOMContentLoaded", () => {
//     console.log(`It's better to burn out than to fade away.`);
//     const container = document.querySelector(".container");
//     let new1 = userData.results.map(user => {
//       return {
//         name: `${user.name.first} ${user.name.last}`,
//         location: `${user.location.street}</br>${user.location.city} ${
//           user.location.state
//         }</br> ${user.location.postcode}`,
//         email: `${user.email}`,
//         phone: `${user.cell}`,
//         picture: `${user.picture.thumbnail}`
//       };
//     });
//     const createDiv = new1 => {
//       console.log(new1);
//       const book = document.createElement("section");
//       book.classList.add("avatar");
//       container.appendChild(book);
//       // console.log(user.name.first)
//       book.innerHTML = `
//               <section class="avatar">
//               <div class="avatar-image">
//                   <img src="${new1.picture}" alt="${new1.name} "/>
//               </div>
//               <div class="avatar-content">
//                   <h2 class="avatar-header">${new1.name}</h2>
//                   <div class="avatar-location">
//                       ${new1.location}
//                   </div>
//                   <ul class="avatar-contact-list">
//                       <li class="avatar-contact-list-item">
//                           <a href="${new1.email}">✉</a>
//                       </li>
//                       <li class="avatar-contact-list-item">
//                           <a href=${new1.cell}>✆</a> 
//                       </li>
//                   </ul>
//               </div>
//           </section>                     

      
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
          console.log(answer, index)
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
        question = response;
        updateButtons(response)
        updateQuestion(response)
      });
      };
      function clickHandler(e){
        const answerSelected = e.srcElement.innerHTML;
        console.log(answerSelected);
        if (answerSelected === question.correct_answer){
          alert("correct")
        }
        console.log(question)
      }

      function setup(){
        for (let i = 0; i<4;i++){
          document.getElementById("answer-"+ i).addEventListener("click", clickHandler)
        }
      }
      setup()
      nextQuestion()
    });
