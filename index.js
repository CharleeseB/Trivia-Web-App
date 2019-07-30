document.addEventListener("DOMContentLoaded", () => {
    console.log(`It's better to burn out than to fade away.`);
    const container = document.querySelector(".container");
    let new1 = userData.results.map(user => {
      return {
        name: `${user.name.first} ${user.name.last}`,
        location: `${user.location.street}</br>${user.location.city} ${
          user.location.state
        }</br> ${user.location.postcode}`,
        email: `${user.email}`,
        phone: `${user.cell}`,
        picture: `${user.picture.thumbnail}`
      };
    });
    const createDiv = new1 => {
      console.log(new1);
      const book = document.createElement("section");
      book.classList.add("avatar");
      container.appendChild(book);
      // console.log(user.name.first)
      book.innerHTML = `
              <section class="avatar">
              <div class="avatar-image">
                  <img src="${new1.picture}" alt="${new1.name} "/>
              </div>
              <div class="avatar-content">
                  <h2 class="avatar-header">${new1.name}</h2>
                  <div class="avatar-location">
                      ${new1.location}
                  </div>
                  <ul class="avatar-contact-list">
                      <li class="avatar-contact-list-item">
                          <a href="${new1.email}">✉</a>
                      </li>
                      <li class="avatar-contact-list-item">
                          <a href=${new1.cell}>✆</a> 
                      </li>
                  </ul>
              </div>
          </section>                     
      
      
              `;
    };
    new1.forEach(user => {
      createDiv(user);
    });
    const boxx = document.createElement("div");
    const letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "Reset"
    ];
    document.body.insertBefore(boxx, container);
    boxx.classList.add("look");
  
    const chosen = letters.map(letter => {
      return `<button class = "target">${letter}</button>`;
    });
    chosen.forEach(button => {
      boxx.innerHTML += button;
    });
    const choose = e => {
      // When a button is pressed the list is filtered by lastnames beginning with that letter
      let letterChose = e.target.innerHTML;
      if (letterChose === user.name.last[0].toUpperCase()) {
          return
      }
    };
    const selected = document.querySelectorAll(".target");
    selected.forEach(letter => {
      letter.addEventListener("click", choose);
    });
  });