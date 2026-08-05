import Phaser from "phaser";

export default class ResponsiveContainer extends Phaser.GameObjects.Container {

    constructor(scene) {

        super(scene);

        scene.add.existing(this);

    }

    layout(width, height) {

    }

}