import Phaser from "phaser";
export default class Ring extends Phaser.GameObjects.Graphics {
  constructor(scene,x,y,radius=120){ super(scene); scene.add.existing(this); this.setPosition(x,y); this.radius=radius; this.redraw(); }
  redraw(){ this.clear(); this.lineStyle(16,0x4a2cff,.12); this.strokeCircle(0,0,this.radius); this.lineStyle(7,0x16aaff,.34); this.strokeCircle(0,0,this.radius); this.lineStyle(3,0x87f7ff,.94); this.strokeCircle(0,0,this.radius); }
  resize(radius){ this.radius=radius; this.redraw(); }
}
