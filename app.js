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
  currentGames = currentGames.filter((item) => item.name != gameName);
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

  let form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("class", "scoreForm");
  let label = document.createElement("label");
  label.innerHTML = "Rate";
  label.setAttribute("for", item.name + "Rating");
  let input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("class", "scoreInput");
  input.setAttribute("id", item.name + "Rating");
  input.setAttribute("min", 0);
  input.setAttribute("max", 10);
  input.setAttribute("required", "");
  let send = document.createElement("button");
  send.setAttribute("type", "submit");
  send.setAttribute("data-id", item.name);
  send.innerHTML = "submit";

  form.append(label);
  form.append(input);
  form.append(send);

  card.append(title);
  card.append(text);
  card.append(score);
  card.append(form);
  card.append(remButton);

  cardDiv.append(card);
}

const LSKG = "app.game";

let savedGames = JSON.parse(localStorage.getItem(LSKG)) || [];

let currentGames = [];

savedGames.forEach((item) => {
  currentGames.push(new flashGame(item.name, item.description, item.ratings));
});

console.table(currentGames);

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

let cardForm = document.querySelectorAll(".scoreForm");

cardForm.forEach((item) =>
  item.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = $(e.target).children("button").attr("data-id");
    let gamearr = currentGames.filter((item) => item.name == name);
    let game = gamearr[0];
    console.log(game);
    console.log(name);
    console.log($(e.target).children("Input").prop("value"));
    game.ratings.push($(e.target).children("Input").prop("value"));
    update();
    draw();
  })
);

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
  currentGames.push(
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
  currentGames.forEach((item) => {
    generateGameCard(item);
  });
}

function save() {
  localStorage.setItem(LSKG, JSON.stringify(currentGames));
}
