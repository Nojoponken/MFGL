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

game.push(new flashGame("Drakens Värld", "Det e ett bra spel asså"));
game.push(
  new flashGame("Grow island", "Ngl de e ganska bra asså, lite grindigt")
);
game.push(new flashGame("Impossible Quiz", "coolt"));

game.forEach((flashGame) => {
  flashGame.updateAverageRating();
  flashGame.generateGameCard();
});
