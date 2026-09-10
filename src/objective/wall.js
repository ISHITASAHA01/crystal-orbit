import Phaser from "phaser";
export default class Wall extends Phaser.GameObjects.Container {
  constructor(scene,x,y,isDanger=false){
    super(scene,x,y); scene.add.existing(this); this.isDanger=isDanger;
    const glow=scene.add.rectangle(0,0,22,82,isDanger?0xff276f:0x27f6ff,.14).setStrokeStyle(8,isDanger?0xff2b95:0x2bf7ff,.18);
    const g=scene.add.graphics(); const c=isDanger?0xff4a91:0x55f5ff;
    g.fillStyle(isDanger?0x841c5f:0x0958a8,.96); g.fillTriangle(-10,-34,10,-22,-10,-10); g.fillTriangle(10,-8,-10,4,10,16); g.fillTriangle(-10,18,10,30,-10,38);
    g.lineStyle(2,c,1); g.strokeRect(-10,-38,20,76);
    this.add([glow,g]);
  }
}
