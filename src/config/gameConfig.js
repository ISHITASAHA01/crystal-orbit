import Phaser from "phaser";
import BootScene from "../scene/BootScene";
import PreloadScene from "../scene/PreloadScene";
import MenuScene from "../scene/MenuScene";
import GameScene from "../scene/GameScene";


// const gameConfig = {
//     type: Phaser.AUTO,

//     parent: "app",

//     backgroundColor: "#0d1117",

//     width: window.innerWidth,

//     height: window.innerHeight,

//     scene: [
//         BootScene,
//         PreloadScene,
//         MenuScene,
//         GameScene
//     ],

//     scale: {
//         mode: Phaser.Scale.RESIZE,
//         autoCenter: Phaser.Scale.CENTER_BOTH
//     }
// };
const gameConfig = {
    type: Phaser.AUTO,

    parent: "app",

    backgroundColor: "#0d1117",

    width: 1280,
    height: 720,

    scene: [
        BootScene,
        PreloadScene,
        MenuScene,
        GameScene
    ],

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

export default gameConfig;