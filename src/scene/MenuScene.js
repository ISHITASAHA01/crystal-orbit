import Phaser from "phaser";
import SceneKeys from "../core/SceneKeys";
import NeonButton from "../UI/NeonButton";
import GalaxyBackdrop from "../UI/GalaxyBackdrop";
import CrystalPlanet from "../UI/CrystalPlanet";

export default class MenuScene extends Phaser.Scene {
  constructor(){ super(SceneKeys.MENU); }

  create(){
    this.bg = new GalaxyBackdrop(this, 720, 1280).setDepth(-20);

    this.add.text(360, 62, "Score : 0", this.hudStyle(35, "#eef8ff")).setOrigin(.5);
    this.add.text(360, 108, `Best : ${Number(localStorage.getItem("bestScore")) || 0}`, this.hudStyle(29, "#ffd925")).setOrigin(.5);
    this.add.text(360, 150, "Level : 1", this.hudStyle(28, "#26f6ff")).setOrigin(.5);

    const hud = this.add.graphics(); hud.lineStyle(3,0x168bff,.85);
    hud.beginPath(); hud.moveTo(190,18); hud.lineTo(246,76); hud.lineTo(304,76); hud.strokePath();
    hud.beginPath(); hud.moveTo(530,18); hud.lineTo(474,76); hud.lineTo(416,76); hud.strokePath();

    this.planet = new CrystalPlanet(this, 360, 350, 142);

    const orbit = this.add.text(360, 570, "ORBIT", {
      fontFamily:"Trebuchet MS, Arial", fontSize:"100px", fontStyle:"bold", color:"#5eeeff",
      stroke:"#055bd3", strokeThickness:8, shadow:{offsetY:8,color:"#001341",blur:10,fill:true}
    }).setOrigin(.5);
    const crystal = this.add.text(360, 654, "CRYSTAL", {
      fontFamily:"Trebuchet MS, Arial", fontSize:"82px", fontStyle:"bold", color:"#ff72f1",
      stroke:"#7722c6", strokeThickness:8, shadow:{offsetY:8,color:"#24002f",blur:10,fill:true}
    }).setOrigin(.5);

    this.add.text(360, 766, "—   Tap Anywhere To Start   —", {
      fontFamily:"Trebuchet MS, Arial",fontSize:"27px",color:"#eefaff",letterSpacing:2
    }).setOrigin(.5);

    this.playButton = new NeonButton(this, 360, 885, "PLAY", () => this.scene.start(SceneKeys.GAME), 390, 96);
    this.add.text(360, 1020, "Tap during orbit to reverse direction", {
      fontFamily:"Arial",fontSize:"20px",color:"#86d9ff"
    }).setOrigin(.5).setAlpha(.8);

    this.input.on("pointerdown", p => {
      if (p.y < 820) this.scene.start(SceneKeys.GAME);
    });

    this.tweens.add({targets:[orbit,crystal], scale:{from:.985,to:1.02}, duration:1400, yoyo:true, repeat:-1, ease:"Sine.easeInOut"});
  }

  hudStyle(size,color){ return {fontFamily:"Trebuchet MS, Arial",fontSize:`${size}px`,fontStyle:"bold",color,stroke:"#032b66",strokeThickness:3}; }

  update(time,delta){ this.bg?.update(delta); this.planet?.update(time); }
}
