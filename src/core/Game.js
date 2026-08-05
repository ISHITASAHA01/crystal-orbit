import Phaser from "phaser";
import gameConfig from "../config/gameConfig";


export default class Game extends Phaser.Game {
    constructor() {
        super(gameConfig);
    }
}