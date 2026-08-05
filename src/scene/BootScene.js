import Phaser from "phaser";
import SceneKeys from "../core/SceneKeys";


export default class BootScene extends Phaser.Scene {

    constructor() {
        super(SceneKeys.BOOT);
    }

    create() {
        this.scene.start(SceneKeys.PRELOAD);
    }
}