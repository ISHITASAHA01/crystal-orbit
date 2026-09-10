import Phaser from "phaser";

export default class CrystalPlanet extends Phaser.GameObjects.Container {
  constructor(scene, x, y, radius = 150) {
    super(scene, x, y); scene.add.existing(this); this.radius = radius;

    this.glow = scene.add.circle(0, 0, radius * 1.18, 0x783dff, 0.10)
      .setStrokeStyle(14, 0x00dfff, 0.10);
    this.core = scene.add.graphics();
    this.orbitsBack = scene.add.graphics();
    this.orbitsFront = scene.add.graphics();
    this.sats = [];

    this.add([this.glow, this.orbitsBack]);
    this.drawCrystal();
    this.add(this.core, this.orbitsFront);
    this.makeSatellites();

    scene.tweens.add({ targets: this.glow, scale: { from: 0.96, to: 1.07 }, alpha: { from: .55, to: 1 }, duration: 1500, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
  }

  drawCrystal() {
    const r = this.radius, g = this.core;
    g.clear();
    g.fillStyle(0x031343, 1); g.fillCircle(0, 0, r);
    g.lineStyle(5, 0x7efaff, 0.9); g.strokeCircle(0, 0, r);

    const pts = [{x:0,y:0}];
    for (let i=0;i<34;i++) {
      const a = Phaser.Math.FloatBetween(0, Math.PI*2);
      const rr = Math.sqrt(Math.random()) * r * .92;
      pts.push({x:Math.cos(a)*rr,y:Math.sin(a)*rr});
    }
    const colors = [0x003fbd,0x006eff,0x08c8ff,0x5218d9,0xa72cff,0x64f5ff,0x0a2f86];
    for (let i=0;i<90;i++) {
      const a = Phaser.Utils.Array.GetRandom(pts), b = Phaser.Utils.Array.GetRandom(pts), c = Phaser.Utils.Array.GetRandom(pts);
      const cx=(a.x+b.x+c.x)/3, cy=(a.y+b.y+c.y)/3;
      if (cx*cx+cy*cy > r*r*.82) continue;
      g.fillStyle(Phaser.Utils.Array.GetRandom(colors), Phaser.Math.FloatBetween(.28,.78));
      g.lineStyle(1, 0x9afcff, .16);
      g.fillTriangle(a.x,a.y,b.x,b.y,c.x,c.y); g.strokeTriangle(a.x,a.y,b.x,b.y,c.x,c.y);
    }
    g.fillStyle(0xffffff, .22); g.fillEllipse(-r*.30,-r*.36,r*.78,r*.25);
    g.fillStyle(0xffffff, .98); g.fillCircle(r*.45,-r*.48,7);
    g.fillStyle(0xff6bff, .72); g.fillCircle(r*.50,-r*.43,15);
  }

  makeSatellites() {
    this.orbitsBack.lineStyle(4,0x1678ff,.85); this.orbitsBack.strokeEllipse(0,0,this.radius*3.1,this.radius*.92);
    this.orbitsBack.lineStyle(3,0xd04cff,.78); this.orbitsBack.strokeEllipse(0,5,this.radius*2.75,this.radius*1.28);
    this.orbitsFront.lineStyle(6,0xff57ec,.86);
    this.orbitsFront.beginPath(); this.orbitsFront.arc(0,0,this.radius*1.34,0.12,2.9,false); this.orbitsFront.strokePath();
    for (let i=0;i<4;i++) {
      const sat = this.scene.add.graphics(); sat.fillStyle(0x052b88,1); sat.fillCircle(0,0,22);
      sat.lineStyle(3,0x78f7ff,1); sat.strokeCircle(0,0,22); sat.lineStyle(2,0xff55f6,.9); sat.strokeCircle(0,0,14);
      sat.fillStyle(0xffffff,.8); sat.fillCircle(-6,-8,4);
      this.add(sat); this.sats.push({node:sat,a:i*Math.PI/2,speed:.00035+(i*.00006)});
    }
  }

  update(time) {
    for (let i=0;i<this.sats.length;i++) {
      const s=this.sats[i]; const a=s.a+time*s.speed;
      s.node.x=Math.cos(a)*this.radius*1.48; s.node.y=Math.sin(a)*this.radius*.55;
      s.node.setScale(.72 + (s.node.y/this.radius + 1)*.16);
      s.node.setDepth(s.node.y>0?2:-1);
    }
    this.core.angle = Math.sin(time*0.0003)*1.2;
  }
}
