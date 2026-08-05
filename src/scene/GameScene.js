import Phaser from "phaser";
import SceneKeys from "../core/SceneKeys";
import Ring from "../objective/Ring";
import Crystal from "../objective/Crystal";
import Shooter from "../objective/Shooter";
import GameManager from "../managaer/GameManager";
import LayoutManager from "../managaer/LayoutManager";
import WallManager from "../managaer/wallManager";


export default class GameScene extends Phaser.Scene {

    constructor() {
        super(SceneKeys.GAME);
    }

    create() {

        this.gameManager = new GameManager(this);
        this.layout = new LayoutManager(this);

        this.cameras.main.setBackgroundColor("#101820");

        this.centerX = this.scale.width / 2;
        this.centerY = this.scale.height / 2;
        this.radius = Math.min(this.scale.width, this.scale.height) * 0.22;

        // ---------------- Score ----------------

        this.scoreText = this.add.text(
            this.centerX,
            50,
            "Score : " + this.gameManager.score,
            {
                fontSize: "32px",
                color: "#ffffff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5);
        this.bestScoreText = this.add.text(
            this.centerX,
            90,
            "Best : " + this.gameManager.bestScore,
            {
                fontSize: "24px",
                color: "#FFD700",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5);
        this.levelText = this.add.text(
            this.centerX,
            130,
            "Level : " + this.gameManager.level,
            {
                fontSize: "24px",
                color: "#00ff99",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5);
        this.layout.top(this.scoreText, 50);

        this.gameOverContainer = this.add.container(this.centerX, this.centerY);
        this.gameOverContainer.setVisible(false);

        const background = this.add.rectangle(0, 0, 490, 420, 0x000000, 0.8);

        const title1 = this.add.text(0, -70, "GAME OVER", {
            fontSize: "36px",
            color: "#ff4444",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.finalScoreText = this.add.text(0, -10, "", {
            fontSize: "28px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.restartText = this.add.text(0, 70, "Restart", {
            fontSize: "30px",
            color: "#00ff99",
            backgroundColor: "#333333",
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        })
            .setOrigin(0.5)
            .setInteractive();
        this.restartText.on("pointerdown", () => {
            this.scene.restart();
        });
        this.gameOverContainer.add([
            background,
            title1,
            this.finalScoreText,
            this.restartText
        ]);
        // ---------------- Ring ----------------

        this.ring = new Ring(
            this,
            this.centerX,
            this.centerY,
            this.radius
        );

        this.layout.center(this.ring);

        // ---------------- Crystal ----------------

        this.crystal = new Crystal(
            this,
            this.centerX,
            this.centerY,
            this.radius
        );

        // ---------------- Shooter ----------------

        this.shooter = new Shooter(
            this,
            this.centerX,
            this.centerY
        );

        // ---------------- Wall Manager ----------------

        this.wallManager = new WallManager(
            this,
            this.centerX,
            this.centerY,
            this.radius
        );

        this.wallManager.createWall(
            Phaser.Math.DegToRad(40)
        );

        // this.wallManager.createWall(
        //     Phaser.Math.DegToRad(220)
        // );

        // ---------------- Input ----------------

        this.input.on("pointerdown", () => {
            if (!this.gameStarted) {
                return;
            }
            this.crystal.changeDirection();

        });
        // ---------------- Resize ----------------

        this.scale.on("resize", this.onResize, this);



        this.gameStarted = false;

        this.startContainer = this.add.container(this.centerX, this.centerY);

        const bg = this.add.rectangle(0, 0, 490, 420, 0x000000, 0.8);

        const title = this.add.text(0, -70, "ORBIT CRYSTAL", {
            fontSize: "40px",
            color: "#00ffff",
            fontStyle: "bold"
        }).setOrigin(0.5);

        const subtitle = this.add.text(0, -20, "Tap Anywhere To Start", {
            fontSize: "22px",
            color: "#ffffff"
        }).setOrigin(0.5);

        const playBtn = this.add.text(0, 60, "▶ PLAY", {
            fontSize: "32px",
            backgroundColor: "#00aa66",
            color: "#ffffff",
            padding: {
                left: 20,
                right: 20,
                top: 10,
                bottom: 10
            }
        })
            .setOrigin(0.5)
            .setInteractive();

        this.tweens.add({
            targets: playBtn,
            scale: 1.1,
            duration: 700,
            yoyo: true,
            repeat: -1
        });
        this.startContainer.add([
            bg,
            title,
            subtitle,
            playBtn
        ]).setDepth(5);

        playBtn.on("pointerdown", () => {

            this.gameStarted = true;

            this.startContainer.setVisible(false);

        });


    }

    update() {
        if (!this.gameStarted) {
            return;
        }
        if (this.gameManager.isGameOver) return;
        this.crystal.update();

        const hitWall = this.wallManager.checkCollision(this.crystal);

        if (hitWall !== -1 && this.gameManager.canScore) {

            this.gameManager.canScore = false;

            this.gameManager.addScore();
            const wall = this.wallManager.getWall(hitWall);

            if (wall.isDanger) {

                this.gameManager.gameOver();

                this.finalScoreText.setText(
                    "Score : " + this.gameManager.score
                );

                this.gameOverContainer.setVisible(true).setDepth(5);
                this.crystal.setVisible(false);

                return;
            }
            this.scoreText.setText("Score : " + this.gameManager.score);
            this.tweens.add({
                targets: this.scoreText,
                scaleX: 1.3,
                scaleY: 1.3,
                duration: 100,
                yoyo: true
            });
            this.cameras.main.shake(80, 0.003);
            this.bestScoreText.setText("Best : " + this.gameManager.bestScore);
            this.levelText.setText("Level : " + this.gameManager.level);
            // if (this.gameManager.level === 2) {
            //     this.crystal.speed = this.crystal.speed > 0 ? 9 : -3;
            // } else if (this.gameManager.level === 3) {
            //     this.crystal.speed = this.crystal.speed > 0 ? 7 : -4;
            // } else if (this.gameManager.level === 4) {
            //     this.crystal.speed = this.crystal.speed > 0 ? 7 : -5;
            // }

            if (this.gameManager.score === 5 && this.wallManager.walls.length === 1) {
                this.wallManager.createWall(Phaser.Math.FloatBetween(0, Math.PI * 2));
            }
            this.wallManager.moveWall(hitWall);
        }

        if (hitWall === -1) {
            this.gameManager.canScore = true;
        }
    }

    onResize(gameSize) {

        this.centerX = gameSize.width / 2;
        this.centerY = gameSize.height / 2;

        this.radius = Math.min(gameSize.width, gameSize.height) * 0.22;

        this.ring.setPosition(
            this.centerX,
            this.centerY
        );

        this.ring.resize(this.radius);

        this.crystal.centerX = this.centerX;
        this.crystal.centerY = this.centerY;
        this.crystal.orbitRadius = this.radius;

        this.shooter.setPosition(
            this.centerX,
            this.centerY
        );

        this.scoreText.setPosition(
            this.centerX,
            50
        );

        this.wallManager.resize(
            this.centerX,
            this.centerY,
            this.radius
        );
    }

}