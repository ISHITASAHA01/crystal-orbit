import Phaser from "phaser";
import SceneKeys from "../core/SceneKeys";
import Ring from "../objective/Ring";
import Crystal from "../objective/Crystal";
import Shooter from "../objective/Shooter";
import GameManager from "../managaer/GameManager";
import WallManager from "../managaer/wallManager";
import GalaxyBackdrop from "../UI/GalaxyBackdrop";
import NeonButton from "../UI/NeonButton";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GAME);
  }

  create() {
    this.gameManager = new GameManager(this);

    // --------------------------------------------------
    // RESPONSIVE GAME SIZE
    // --------------------------------------------------
    this.updateLayoutValues();

    this.bg = new GalaxyBackdrop(
      this,
      this.gameWidth,
      this.gameHeight
    ).setDepth(-20);

    // --------------------------------------------------
    // GAME OBJECTS
    // --------------------------------------------------
    this.createHUD();

    this.ring = new Ring(
      this,
      this.centerX,
      this.centerY,
      this.radius
    ).setDepth(0);

    this.shooter = new Shooter(
      this,
      this.centerX,
      this.centerY
    ).setDepth(1);

    this.crystal = new Crystal(
      this,
      this.centerX,
      this.centerY,
      this.radius
    ).setDepth(3);

    this.wallManager = new WallManager(
      this,
      this.centerX,
      this.centerY,
      this.radius
    );

    this.wallManager.createWall(
      Phaser.Math.DegToRad(35)
    );

    // --------------------------------------------------
    // GAME STATE
    // --------------------------------------------------
    this.gameStarted = false;

    this.createStartOverlay();
    this.createGameOverOverlay();

    // --------------------------------------------------
    // INPUT
    // --------------------------------------------------
    this.input.on("pointerdown", () => {
      if (
        this.gameStarted &&
        !this.gameManager.isGameOver
      ) {
        this.crystal.changeDirection();
      }
    });

    // --------------------------------------------------
    // RESIZE
    // --------------------------------------------------
    this.scale.on("resize", this.handleResize, this);
  }

  // ==================================================
  // RESPONSIVE LAYOUT
  // ==================================================

  updateLayoutValues() {
    this.gameWidth = this.scale.width;
    this.gameHeight = this.scale.height;

    /*
     * Keep the game in portrait proportions.
     *
     * On mobile:
     *   center follows the screen.
     *
     * On desktop:
     *   game remains centered and compact.
     */

    this.centerX = this.gameWidth / 2;

    // Keep the orbit slightly above the exact center
    // so the HUD has enough space.
    this.centerY = this.gameHeight * 0.51;

    // Responsive radius.
    this.radius = Math.min(
      this.gameWidth * 0.32,
      this.gameHeight * 0.22
    );

    // Small screens need a little more room.
    if (this.gameWidth < 500) {
      this.radius = Math.min(
        this.gameWidth * 0.36,
        this.gameHeight * 0.21
      );
    }
  }

  handleResize(gameSize) {
    if (!gameSize) return;

    this.updateLayoutValues();

    // Update background.
    if (this.bg?.resize) {
      this.bg.resize(
        this.gameWidth,
        this.gameHeight
      );
    }

    // Update main game objects.
    if (this.ring?.setPosition) {
      this.ring.setPosition(
        this.centerX,
        this.centerY
      );
    }

    if (this.shooter?.setPosition) {
      this.shooter.setPosition(
        this.centerX,
        this.centerY
      );
    }

    if (this.crystal?.setPosition) {
      this.crystal.setPosition(
        this.centerX,
        this.centerY
      );
    }

    // If your custom classes expose a resize/update method,
    // use it to update their internal radius/geometry.
    if (this.ring?.resize) {
      this.ring.resize(
        this.centerX,
        this.centerY,
        this.radius
      );
    }

    if (this.crystal?.resize) {
      this.crystal.resize(
        this.centerX,
        this.centerY,
        this.radius
      );
    }

    if (this.wallManager?.resize) {
      this.wallManager.resize(
        this.centerX,
        this.centerY,
        this.radius
      );
    }

    // Update HUD.
    this.updateHUDLayout();

    // Update overlays.
    this.updateOverlayLayout();
  }

  // ==================================================
  // HUD
  // ==================================================

  createHUD() {
    const hudWidth = Math.min(
      this.gameWidth - 32,
      520
    );

    const hudHeight = this.gameWidth < 500
      ? 125
      : 150;

    this.hudPanel = this.add
      .rectangle(
        this.centerX,
        this.gameHeight * 0.065,
        hudWidth,
        hudHeight,
        0x03102b,
        0.42
      )
      .setStrokeStyle(
        this.gameWidth < 500 ? 2 : 2,
        0x167fff,
        0.38
      )
      .setDepth(10);

    const scoreSize = this.gameWidth < 500 ? 28 : 35;
    const smallSize = this.gameWidth < 500 ? 22 : 27;

    this.scoreText = this.add
      .text(
        this.centerX,
        this.gameHeight * 0.035,
        "Score : 0",
        this.hud(scoreSize, "#f0f8ff")
      )
      .setOrigin(0.5)
      .setDepth(11);

    this.bestScoreText = this.add
      .text(
        this.centerX,
        this.gameHeight * 0.070,
        `Best : ${this.gameManager.bestScore}`,
        this.hud(smallSize, "#ffd728")
      )
      .setOrigin(0.5)
      .setDepth(11);

    this.levelText = this.add
      .text(
        this.centerX,
        this.gameHeight * 0.102,
        "Level : 1",
        this.hud(smallSize, "#27efff")
      )
      .setOrigin(0.5)
      .setDepth(11);
  }

  updateHUDLayout() {
    if (!this.scoreText) return;

    const scoreSize = this.gameWidth < 500 ? 28 : 35;
    const smallSize = this.gameWidth < 500 ? 22 : 27;

    this.hudPanel
      ?.setPosition(
        this.centerX,
        this.gameHeight * 0.065
      )
      ?.setSize(
        Math.min(this.gameWidth - 32, 520),
        this.gameWidth < 500 ? 125 : 150
      );

    this.scoreText
      .setPosition(
        this.centerX,
        this.gameHeight * 0.035
      )
      .setFontSize(scoreSize);

    this.bestScoreText
      .setPosition(
        this.centerX,
        this.gameHeight * 0.070
      )
      .setFontSize(smallSize);

    this.levelText
      .setPosition(
        this.centerX,
        this.gameHeight * 0.102
      )
      .setFontSize(smallSize);
  }

  hud(size, color) {
    return {
      fontFamily: "Trebuchet MS, Arial",
      fontSize: `${size}px`,
      fontStyle: "bold",
      color,
      stroke: "#06245e",
      strokeThickness: 3
    };
  }

  // ==================================================
  // START OVERLAY
  // ==================================================

  createStartOverlay() {
    this.startContainer = this.add
      .container(
        this.centerX,
        this.centerY
      )
      .setDepth(20);

    this.startPanel = this.add
      .rectangle(
        0,
        0,
        Math.min(this.gameWidth - 32, 610),
        Math.min(this.gameHeight * 0.48, 570),
        0x020617,
        0.88
      )
      .setStrokeStyle(
        3,
        0x4aeaff,
        0.62
      );

    // -----------------------------
    // TITLE
    // -----------------------------

    const titleSize = this.gameWidth < 500
      ? 52
      : 70;

    this.startTitle = this.add
      .text(
        0,
        -205,
        "ORBIT\nCRYSTAL",
        {
          fontFamily: "Trebuchet MS, Arial",
          fontSize: `${titleSize}px`,
          fontStyle: "bold",
          align: "center",
          color: "#70f4ff",
          stroke: "#6234e8",
          strokeThickness: 6,
          lineSpacing: -8
        }
      )
      .setOrigin(0.5);

    // -----------------------------
    // HOW TO PLAY
    // -----------------------------

    this.startCopy = this.add
      .text(
        0,
        -45,
        "HOW TO PLAY",
        {
          fontFamily: "Trebuchet MS, Arial",
          fontSize: this.gameWidth < 500
            ? "25px"
            : "30px",
          fontStyle: "bold",
          color: "#ffffff",
          stroke: "#167fff",
          strokeThickness: 2,
          align: "center"
        }
      )
      .setOrigin(0.5);

    // -----------------------------
    // GAME RULES
    // -----------------------------

    this.startRules = this.add
      .text(
        0,
        40,
        "🔴  RED STONE  →  GAME OVER\n\n" +
        "🟢  GREEN STONE  →  KEEP GOING\n\n" +
        "👆  TAP  →  REVERSE DIRECTION",
        {
          fontFamily: "Arial",
          fontSize: this.gameWidth < 500
            ? "17px"
            : "21px",
          fontStyle: "bold",
          align: "center",
          color: "#d8efff",
          lineSpacing: 5
        }
      )
      .setOrigin(0.5);

    // -----------------------------
    // EXTRA MESSAGE
    // -----------------------------

    this.startHint = this.add
      .text(
        0,
        125,
        "🎯 Avoid red stones and score as high as you can!",
        {
          fontFamily: "Arial",
          fontSize: this.gameWidth < 500
            ? "15px"
            : "18px",
          fontStyle: "bold",
          align: "center",
          color: "#27efff"
        }
      )
      .setOrigin(0.5);

    // -----------------------------
    // PLAY BUTTON
    // -----------------------------

    this.startPlay = new NeonButton(
      this,
      0,
      190,
      "PLAY",
      () => {
        this.gameStarted = true;
        this.startContainer.setVisible(false);
      },
      Math.min(this.gameWidth - 90, 380),
      this.gameWidth < 500 ? 78 : 92
    );

    // -----------------------------
    // ADD EVERYTHING
    // -----------------------------

    this.startContainer.add([
      this.startPanel,
      this.startTitle,
      this.startCopy,
      this.startRules,
      this.startHint,
      this.startPlay
    ]);
  }

  // ==================================================
  // GAME OVER OVERLAY
  // ==================================================

  createGameOverOverlay() {
    this.gameOverContainer = this.add
      .container(
        this.centerX,
        this.centerY
      )
      .setDepth(30)
      .setVisible(false);

    this.gameOverPanel = this.add
      .rectangle(
        0,
        0,
        Math.min(this.gameWidth - 32, 610),
        Math.min(this.gameHeight * 0.55, 650),
        0x020617,
        0.92
      )
      .setStrokeStyle(
        4,
        0x5decff,
        0.72
      );

    const titleSize = this.gameWidth < 500
      ? 50
      : 66;

    this.gameOverTitle = this.add
      .text(
        0,
        -225,
        "GAME OVER",
        {
          fontFamily: "Trebuchet MS, Arial",
          fontSize: `${titleSize}px`,
          fontStyle: "bold",
          color: "#ff76ed",
          stroke: "#5829d2",
          strokeThickness: 6
        }
      )
      .setOrigin(0.5);

    this.finalScoreText = this.add
      .text(
        0,
        -110,
        "Score\n0",
        {
          fontFamily: "Arial",
          fontSize: this.gameWidth < 500
            ? "30px"
            : "34px",
          fontStyle: "bold",
          align: "center",
          color: "#ffffff",
          lineSpacing: 10
        }
      )
      .setOrigin(0.5);

    this.bestFinal = this.add
      .text(
        0,
        -18,
        "Best  0",
        {
          fontFamily: "Arial",
          fontSize: this.gameWidth < 500
            ? "24px"
            : "28px",
          fontStyle: "bold",
          color: "#ffe23c"
        }
      )
      .setOrigin(0.5);

    this.retryButton = new NeonButton(
      this,
      0,
      105,
      "RETRY",
      () => this.scene.restart(),
      Math.min(this.gameWidth - 90, 380),
      this.gameWidth < 500 ? 76 : 90
    );

    this.mainMenuButton = this.add
      .text(
        0,
        200,
        "MAIN MENU",
        {
          fontFamily: "Trebuchet MS, Arial",
          fontSize: this.gameWidth < 500
            ? "24px"
            : "28px",
          fontStyle: "bold",
          color: "#9aeaff",
          backgroundColor: "#071a42",
          padding: {
            left: 34,
            right: 34,
            top: 14,
            bottom: 14
          }
        }
      )
      .setOrigin(0.5)
      .setInteractive({
        useHandCursor: true
      });

    this.mainMenuButton.on(
      "pointerup",
      () => this.scene.start(SceneKeys.MENU)
    );

    this.gameOverContainer.add([
      this.gameOverPanel,
      this.gameOverTitle,
      this.finalScoreText,
      this.bestFinal,
      this.retryButton,
      this.mainMenuButton
    ]);
  }

  // ==================================================
  // OVERLAY RESIZE
  // ==================================================

  updateOverlayLayout() {
    if (!this.startContainer) return;

    this.startContainer.setPosition(
      this.centerX,
      this.centerY
    );

    this.gameOverContainer?.setPosition(
      this.centerX,
      this.centerY
    );

    const isMobile = this.gameWidth < 500;

    // Start overlay
    this.startPanel?.setSize(
      Math.min(this.gameWidth - 32, 610),
      Math.min(this.gameHeight * 0.48, 570)
    );

    this.startTitle?.setFontSize(
      isMobile ? 52 : 70
    );

    this.startCopy?.setFontSize(
      isMobile ? 20 : 24
    );

    // Game over
    this.gameOverPanel?.setSize(
      Math.min(this.gameWidth - 32, 610),
      Math.min(this.gameHeight * 0.55, 650)
    );

    this.gameOverTitle?.setFontSize(
      isMobile ? 50 : 66
    );

    this.finalScoreText?.setFontSize(
      isMobile ? 30 : 34
    );

    this.bestFinal?.setFontSize(
      isMobile ? 24 : 28
    );

    this.mainMenuButton?.setFontSize(
      isMobile ? 24 : 28
    );
  }

  // ==================================================
  // GAME LOOP
  // ==================================================

  update(time, delta) {
    this.bg?.update(delta);

    if (this.shooter) {
      this.shooter.angle += 0.12 * delta;
    }

    if (
      !this.gameStarted ||
      this.gameManager.isGameOver
    ) {
      return;
    }

    this.crystal.update();

    const hit =
      this.wallManager.checkCollision(
        this.crystal
      );

    if (
      hit !== -1 &&
      this.gameManager.canScore
    ) {
      this.gameManager.canScore = false;

      this.gameManager.addScore();

      const wall =
        this.wallManager.getWall(hit);

      if (wall.isDanger) {
        this.gameManager.gameOver();

        this.finalScoreText.setText(
          `Score\n${this.gameManager.score}`
        );

        this.bestFinal.setText(
          `Best  ${this.gameManager.bestScore}`
        );

        this.gameOverContainer.setVisible(true);

        this.crystal.setVisible(false);

        return;
      }

      this.scoreText.setText(
        `Score : ${this.gameManager.score}`
      );

      this.bestScoreText.setText(
        `Best : ${this.gameManager.bestScore}`
      );

      this.levelText.setText(
        `Level : ${this.gameManager.level}`
      );

      this.tweens.add({
        targets: this.scoreText,
        scale: 1.28,
        duration: 100,
        yoyo: true
      });

      this.cameras.main.shake(
        80,
        0.002
      );

      if (
        this.gameManager.score === 5 &&
        this.wallManager.walls.length === 1
      ) {
        this.wallManager.createWall(
          Phaser.Math.FloatBetween(
            0,
            Math.PI * 2
          )
        );
      }

      this.wallManager.moveWall(hit);
    }

    if (hit === -1) {
      this.gameManager.canScore = true;
    }
  }
}
