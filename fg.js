// flashGame klassen var ivägen så jag stoppade den här istället

module.exports = {
  flashGame: class flashGameClass {
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
  },
};
