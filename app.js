"use strict";

const cardDiv = document.querySelector("#cardDiv");

class flashGame {
  constructor(Name, Description, Ratings) {
    this.name = Name;
    this.description = Description;
    this.ratings = Ratings;
    this.averageRating = updateAvarageRating(this);
  }
}

function updateAvarageRating(item) {
  return (
    item.ratings.reduce((sum, current) => sum + current) / item.ratings.length
  );
}

function removeGame(event) {
  let gameName = event.target.getAttribute("data-id");
  newGames = newGames.filter((item) => item.name != gameName);
  update();
  draw();
}

function generateGameCard(item) {
  let card = document.createElement("div");
  card.setAttribute("class", "cardBody");

  let title = document.createElement("h2");
  title.setAttribute("class", "cardTitle");
  title.innerHTML = item.name;
  let text = document.createElement("p");
  text.setAttribute("class", "cardText");
  text.innerHTML = item.description;
  let score = document.createElement("p");
  score.setAttribute("class", "cardScore");
  score.innerHTML = item.averageRating;

  let remButton = document.createElement("button");
  remButton.setAttribute("type", "button");
  remButton.addEventListener("click", removeGame);
  remButton.setAttribute("data-id", item.name);
  remButton.innerHTML = "Remove";

  card.append(title);
  card.append(text);
  card.append(score);
  card.append(remButton);

  cardDiv.append(card);
}

const LSKG = "app.game";

let game = JSON.parse(localStorage.getItem(LSKG)) || [];

let newGames = [];

game.forEach((item) => {
  newGames.push(new flashGame(item.name, item.description, item.ratings));
});

console.table(newGames);

// game.forEach((item) => {
//   console.log(
//     item.ratings.reduce((sum, current) => sum + current) / item.ratings.length
//   );
//   for (let property in item) {
//     console.log(property + ": " + item[property]);
//   }
// });

update();
draw();

let gameForm = document.querySelector("#gameForm");
let gfTitle = document.querySelector("#title");
let gfDesc = document.querySelector("#description");
let gfRating = document.querySelector("#rating");

gameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    gfTitle.value.trim() === "" ||
    gfDesc.value.trim() === "" ||
    gfRating.value.trim() === ""
  ) {
    return;
  }
  newGames.push(
    new flashGame(gfTitle.value.trim(), gfDesc.value.trim(), [
      gfRating.value.trim(),
    ])
  );
  gfTitle.value = "";
  gfDesc.value = "";
  gfRating.value = "";
  update();
  draw();
});

function update() {
  save();
}

function draw() {
  cardDiv.innerHTML = "";
  newGames.forEach((item) => {
    generateGameCard(item);
  });
}

function save() {
  localStorage.setItem(LSKG, JSON.stringify(newGames));
}
