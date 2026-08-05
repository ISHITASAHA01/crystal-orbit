import Phaser from "phaser";

export default class Ring extends Phaser.GameObjects.Arc {

    constructor(scene, x, y, radius = 120) {

        super(
            scene,
            x,
            y,
            radius,
            0,
            360,
            false,
            0xffffff,
            0
        );

        scene.add.existing(this);

        this.setStrokeStyle(6, 0x4CAF50);
    }

    resize(radius) {

        this.radius = radius;

        this.setRadius(radius);

    }

}