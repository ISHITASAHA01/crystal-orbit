import Phaser from "phaser";
import { GAME } from "../utils/Constants";
export default class Crystal extends Phaser.GameObjects.Container {
  constructor(scene,centerX,centerY,orbitRadius){
    super(scene,0,0); scene.add.existing(this); this.centerX=centerX; this.centerY=centerY; this.orbitRadius=orbitRadius;
    this.angleValue=-90; this.speed=GAME.ROTATION_SPEED;
    const glow=scene.add.circle(0,0,35,0x00cfff,.18).setStrokeStyle(8,0x873cff,.18);
    const body=scene.add.graphics();
    body.fillStyle(0x086fff,1); body.fillCircle(0,0,17); body.lineStyle(3,0x85fbff,1); body.strokeCircle(0,0,17);
    body.fillStyle(0x8b38ff,.8); body.fillTriangle(-11,4,0,-15,10,5); body.fillStyle(0xffffff,.7); body.fillTriangle(-5,-8,0,-15,3,-4);
    this.add([glow,body]); this.setSize(36,36); this.update();
    scene.tweens.add({targets:glow,scale:{from:.8,to:1.25},alpha:{from:.3,to:.9},duration:500,yoyo:true,repeat:-1});
  }
  update(){ this.angleValue+=this.speed; const rad=Phaser.Math.DegToRad(this.angleValue); this.x=this.centerX+Math.cos(rad)*this.orbitRadius; this.y=this.centerY+Math.sin(rad)*this.orbitRadius; this.angle+=2.2; }
  changeDirection(){ this.speed*=-1; }
}
