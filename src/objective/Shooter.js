import Phaser from "phaser";

export default class Shooter extends Phaser.GameObjects.Graphics {

    constructor(scene, x, y) {

        super(scene);

        scene.add.existing(this);

        this.fillStyle(0xffffff, 1);
        this.fillCircle(0, 0, 10);

        this.x = x;
        this.y = y;
    }

}