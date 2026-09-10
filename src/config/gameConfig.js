import Phaser from "phaser";

import BootScene from "../scene/BootScene";
import PreloadScene from "../scene/PreloadScene";
import MenuScene from "../scene/MenuScene";
import GameScene from "../scene/GameScene";

const gameConfig = {
  type: Phaser.AUTO,

  parent: "app",

  backgroundColor: "#02051a",

  // Design resolution
  width: 720,
  height: 1280,

  scene: [
    BootScene,
    PreloadScene,
    MenuScene,
    GameScene
  ],

  render: {
    antialias: true,
    roundPixels: false
  },

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,

    width: 720,
    height: 1280,

    expandParent: true
  }
};

export default gameConfig;
