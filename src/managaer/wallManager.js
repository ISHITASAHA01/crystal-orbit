import Phaser from "phaser";
import Wall from "../objective/wall";
export default class WallManager {

    constructor(scene, centerX, centerY, radius) {

        this.scene = scene;

        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;

        this.walls = [];
    }
    createWall(angle) {

        const isDanger = this.walls.length % 2 === 1;

        const wall = new Wall(
            this.scene,
            this.centerX + Math.cos(angle) * this.radius,
            this.centerY + Math.sin(angle) * this.radius,
            isDanger
        );

        wall.setRotation(angle);

        this.walls.push(wall);

        return wall;
    }

    moveWall(index) {

        const wall = this.walls[index];

        wall.canScore = true;

        const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);

        const newX = this.centerX + Math.cos(angle) * this.radius;
        const newY = this.centerY + Math.sin(angle) * this.radius;

        this.scene.tweens.add({

            targets: wall,

            x: newX,

            y: newY,

            rotation: angle,

            duration: 300,

            ease: "Sine.easeInOut"

        });

    }
    getWall(index) {
        return this.walls[index];
    }
    checkCollision(crystal) {

        for (let i = 0; i < this.walls.length; i++) {

            const wall = this.walls[i];

            const distance = Phaser.Math.Distance.Between(
                crystal.x,
                crystal.y,
                wall.x,
                wall.y
            );

            if (distance < 20) {
                return i;
            }
        }

        return -1;
    }
    resize(centerX, centerY, radius) {

        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;

        for (let i = 0; i < this.walls.length; i++) {

            this.moveWall(i);

        }

    }
    createWalls(count) {

        while (this.walls.length < count) {

            const angle = Phaser.Math.FloatBetween(
                0,
                Math.PI * 2
            );

            this.createWall(angle);

        }

    }


}