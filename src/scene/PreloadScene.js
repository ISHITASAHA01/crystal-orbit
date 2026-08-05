import Phaser from "phaser";
import SceneKeys from "../core/SceneKeys";


export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super(SceneKeys.PRELOAD);
    }

    preload() {
        // Assets yaha load honge
    }

    create() {
        this.scene.start(SceneKeys.MENU);
    }
}