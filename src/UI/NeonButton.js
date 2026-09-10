import Phaser from "phaser";

export default class NeonButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, label, callback, width = 380, height = 92) {
    super(scene, x, y);
    scene.add.existing(this);

    const glow = scene.add.rectangle(0, 0, width + 20, height + 20, 0x00c8ff, 0.10)
      .setStrokeStyle(8, 0x00eaff, 0.22);
    const frame = scene.add.graphics();
    this.drawFrame(frame, width, height);
    const shine = scene.add.rectangle(0, -height * 0.18, width * 0.78, height * 0.17, 0xffffff, 0.10)
      .setAngle(-3);
    const play = scene.add.text(-width * 0.28, 0, "▶", {
      fontFamily: "Trebuchet MS, Arial", fontSize: "42px", color: "#ffffff",
      stroke: "#79f7ff", strokeThickness: 2,
    }).setOrigin(0.5);
    const text = scene.add.text(width * 0.04, 0, label, {
      fontFamily: "Trebuchet MS, Arial", fontSize: "44px", fontStyle: "bold",
      color: "#ffffff", stroke: "#0876d7", strokeThickness: 3,
    }).setOrigin(0.5);

    this.add([glow, frame, shine, play, text]);
    this.setSize(width, height).setInteractive({ useHandCursor: true });

    this.on("pointerover", () => scene.tweens.add({ targets: this, scale: 1.035, duration: 120 }));
    this.on("pointerout", () => scene.tweens.add({ targets: this, scale: 1, duration: 120 }));
    this.on("pointerdown", () => scene.tweens.add({ targets: this, scale: 0.97, duration: 60, yoyo: true }));
    this.on("pointerup", () => callback?.());

    scene.tweens.add({ targets: glow, alpha: { from: 0.45, to: 1 }, duration: 900, yoyo: true, repeat: -1 });
  }

  drawFrame(g, w, h) {
    const x = -w / 2, y = -h / 2, c = 22;
    g.fillStyle(0x043f9b, 0.90);
    g.lineStyle(4, 0x5df7ff, 1);
    g.beginPath();
    g.moveTo(x + c, y); g.lineTo(x + w - c, y); g.lineTo(x + w, y + c);
    g.lineTo(x + w, y + h - c); g.lineTo(x + w - c, y + h); g.lineTo(x + c, y + h);
    g.lineTo(x, y + h - c); g.lineTo(x, y + c); g.closePath();
    g.fillPath(); g.strokePath();
    g.lineStyle(2, 0x2298ff, 0.85);
    g.strokeRect(x + 12, y + 12, w - 24, h - 24);
  }
}
