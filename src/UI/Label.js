import Phaser from "phaser";

export default class Label extends Phaser.GameObjects.Text {

    constructor(scene, text) {

        super(scene, 0, 0, text, {

            fontSize: 48,

            color: "#ffffff",

            fontFamily: "Arial"

        });

        scene.add.existing(this);

        this.setOrigin(.5);

    }

}