class flashGame {
  constructor(Name, Description) {
    this.name = Name;
    this.description = Description;
    this.ratings = [5, 7, 4, 8, 8, 7, 9, 10, 8, 10];
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
let game = [];
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
  game.push(new flashGame(gfTitle.value.trim(), gfDesc.value.trim()));
  gfTitle.value = "";
  gfDesc.value = "";
});

game.forEach((flashGame) => {
  flashGame.updateAverageRating();
  flashGame.generateGameCard();
});
