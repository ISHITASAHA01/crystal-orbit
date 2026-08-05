import Phaser from "phaser";

export default class Button extends Phaser.GameObjects.Container {

    constructor(scene, x, y, text, callback) {

        super(scene, x, y);

        scene.add.existing(this);

        this.background = scene.add.rectangle(
            0,
            0,
            220,
            60,
            0x4CAF50,
            1
        );

        this.background.setStrokeStyle(2, 0xffffff);

        this.label = scene.add.text(0, 0, text, {
            fontSize: "28px",
            color: "#ffffff",
            fontFamily: "Arial"
        }).setOrigin(0.5);

        this.add([
            this.background,
            this.label
        ]);

        this.setSize(220, 60);

        this.setInteractive(
            new Phaser.Geom.Rectangle(-110, -30, 220, 60),
            Phaser.Geom.Rectangle.Contains
        );

        this.on("pointerover", () => {
            this.setScale(1.05);
        });

        this.on("pointerout", () => {
            this.setScale(1);
        });

        this.on("pointerdown", () => {
            this.setScale(0.95);
        });

        this.on("pointerup", () => {
            this.setScale(1.05);

            if (callback) callback();
        });

    }
    setPosition(x, y) {
        super.setPosition(x, y);
    }

}