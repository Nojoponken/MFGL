"use strict";
class flashGame {
  constructor(Name, Description, Ratings) {
    this.name = Name;
    this.description = Description;
    this.ratings = [Ratings];
    this.averageRating = 0.0;
  }
  generateGameCard() {
    let card = document.createElement("div");
    card.setAttribute("id", "cardBody");

    let title = document.createElement("h2");
    title.setAttribute("id", "cardTitle");
    title.innerHTML = this.name;
    let text = document.createElement("p");
    text.setAttribute("id", "cardText");
    text.innerHTML = this.description;
    let score = document.createElement("p");
    score.setAttribute("id", "cardScore");
    score.innerHTML = this.averageRating;

    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(score);

    document.getElementById("cardDiv").appendChild(card);
  }

  updateAverageRating() {
    this.averageRating = 0;
    this.ratings.forEach((int) => {
      this.averageRating += int;
    });
    this.averageRating =
      Math.round(
        (this.averageRating / this.ratings.length + Number.EPSILON) * 10
      ) / 10;
  }
}

const LSKG = "app.game";

let game = JSON.parse(localStorage.getItem(LSKG)) || [];

game.forEach((item) => {
  item = new flashGame(item.name, item.description, item.ratings);
});

// game.forEach((item) => {
//   console.log(
//     item.ratings.reduce((sum, current) => sum + current) / item.ratings.length
//   );
//   for (let property in item) {
//     console.log(property + ": " + item[property]);
//   }
// });

updateGames();

let gameForm = document.querySelector("#gameForm");
let gfTitle = document.querySelector("#title");
let gfDesc = document.querySelector("#description");
let gfRating = document.querySelector("#rating");

gameForm.addEventListener("submit", (e) => {
  if (
    gfTitle.value.trim() === "" ||
    gfDesc.value.trim() === "" ||
    gfRating.value.trim() === ""
  ) {
    return;
  }
  game.push(
    new flashGame(
      gfTitle.value.trim(),
      gfDesc.value.trim(),
      gfRating.value.trim()
    )
  );
  gfTitle.value = "";
  gfDesc.value = "";
  gfRating.value = "";
  updateGames();
});

function updateGames() {
  save();
  console.log(game);
  let temp = new flashGame("test", "test test", [9]);
  temp.generateGameCard();
}

function save() {
  localStorage.setItem(LSKG, JSON.stringify(game));
}
