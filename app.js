"use strict";

const LSKG = "app.games";

let game = JSON.parse(localStorage.getItem(LSKG)) || [];

game.forEach((element) => {
  element.updateAverageRating();
  element.generateGameCard();
});

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
  game.forEach((element) => {
    element.updateAverageRating();
    element.generateGameCard();
  });
}

function save() {
  localStorage.setItem(LSKG, JSON.stringify(game));
}
