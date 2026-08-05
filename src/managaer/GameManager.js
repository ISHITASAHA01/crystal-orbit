export default class GameManager {

    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.level = 1;
        this.bestScore = Number(localStorage.getItem("bestScore")) || 0;
        this.isGameOver = false;
        this.canScore = true;
    }

    addScore() {

        this.score++;

        if (this.score > this.bestScore) {

            this.bestScore = this.score;

            localStorage.setItem(
                "bestScore",
                this.bestScore
            );
        }
        this.updateLevel();
    }
    gameOver() {
        this.isGameOver = true;
    }
    reset() {
        this.score = 0;
        this.isGameOver = false;
        this.canScore = true;
    }
    updateLevel() {

        this.level = Math.floor(this.score / 5) + 1;

    }
}


