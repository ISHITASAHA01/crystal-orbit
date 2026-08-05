import Phaser from "phaser";
import { GAME } from "../utils/Constants";

export default class Crystal extends Phaser.GameObjects.Graphics {

    constructor(scene, centerX, centerY, orbitRadius) {

        super(scene);

        scene.add.existing(this);

        this.fillStyle(0x00ffff, 1);
        this.fillCircle(0, 0, GAME.CRYSTAL_RADIUS);

        this.centerX = centerX;
        this.centerY = centerY;
        this.orbitRadius = orbitRadius;

        this.angleValue = -90;
        this.speed = GAME.ROTATION_SPEED;
        this.angularSpeed = 0.02;

        this.update();
    }

    update() {

        this.angleValue += this.speed;

        const rad = Phaser.Math.DegToRad(this.angleValue);

        this.x = this.centerX + Math.cos(rad) * this.orbitRadius;
        this.y = this.centerY + Math.sin(rad) * this.orbitRadius;
    }
    changeDirection() {
        this.speed *= -1;
    }
   
}