import Phaser from "phaser";

export default class Wall extends Phaser.GameObjects.Rectangle {

    constructor(scene, x, y, isDanger = false) {

        super(
            scene,
            x,
            y,
            18,
            60,
            isDanger ? 0xff0000 : 0x00ff00
        );

        scene.add.existing(this);

        this.wallWidth = 18;
        this.wallHeight = 60;

        this.isDanger = isDanger;
    }
}