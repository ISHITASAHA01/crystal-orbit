import Phaser from "phaser";
export default class Shooter extends Phaser.GameObjects.Container {
  constructor(scene,x,y){ super(scene,x,y); scene.add.existing(this); const glow=scene.add.circle(0,0,48,0x1b79ff,.12); const g=scene.add.graphics();
    g.fillStyle(0x041846,1); g.fillCircle(0,0,35); g.lineStyle(4,0x55ecff,1); g.strokeCircle(0,0,35); g.lineStyle(3,0xff5ff5,.8); g.strokeCircle(0,0,24);
    g.fillStyle(0x1c7eff,.9); g.fillTriangle(-13,13,0,-23,14,13); g.fillStyle(0xffffff,.65);g.fillTriangle(-5,-12,0,-23,5,-10); this.add([glow,g]);
    scene.tweens.add({targets:glow,scale:{from:.9,to:1.16},alpha:{from:.35,to:.75},duration:900,yoyo:true,repeat:-1});
  }
}
