import Phaser from "phaser";

export default class GalaxyBackdrop extends Phaser.GameObjects.Container {
  constructor(scene, width = 720, height = 1280) {
    super(scene, 0, 0);
    scene.add.existing(this);
    this.w = width; this.h = height;

    const bg = scene.add.graphics();
    bg.fillGradientStyle(0x020719, 0x06102d, 0x04031a, 0x07133a, 1);
    bg.fillRect(0, 0, width, height);
    this.add(bg);

    this.nebula = scene.add.graphics();
    this.add(this.nebula);
    this.drawNebula();

    this.stars = [];
    for (let i = 0; i < 120; i++) {
      const size = Phaser.Math.FloatBetween(0.8, 2.3);
      const palette = [0xffffff, 0x72dfff, 0x9d7bff, 0xff8cff];
      const star = scene.add.circle(
        Phaser.Math.Between(0, width), Phaser.Math.Between(0, height), size,
        Phaser.Utils.Array.GetRandom(palette), Phaser.Math.FloatBetween(0.25, 0.95)
      );
      star.speed = Phaser.Math.FloatBetween(2, 10);
      this.stars.push(star); this.add(star);
    }

    this.planet = scene.add.graphics();
    this.drawCornerPlanet(this.planet, 56, 1215, 185);
    this.add(this.planet);

    scene.tweens.add({ targets: this.nebula, alpha: { from: 0.65, to: 1 }, angle: { from: -1.5, to: 1.5 }, duration: 5200, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
  }

  drawNebula() {
    const n = this.nebula;
    const blobs = [
      [150, 255, 150, 0x3d1a8c], [570, 310, 180, 0x073c9f], [505, 760, 220, 0x5a167e],
      [230, 1000, 190, 0x063d8f], [620, 1080, 170, 0x65125f], [92, 720, 140, 0x28137d]
    ];
    for (const [x, y, r, c] of blobs) {
      for (let i = 0; i < 5; i++) {
        n.fillStyle(c, 0.035 + i * 0.012);
        n.fillEllipse(x + i * 6, y - i * 5, r * (1.7 - i * .18), r * (.55 + i * .08));
      }
    }
    // Phaser 4 Graphics no longer exposes Canvas-style bezierCurveTo().
    // Approximate the same cubic Bezier with short line segments so the
    // nebula ribbon remains compatible with Phaser 4.
    n.lineStyle(3, 0x884cff, 0.12);
    n.beginPath();
    const p0 = { x: 25, y: 780 };
    const p1 = { x: 180, y: 640 };
    const p2 = { x: 520, y: 680 };
    const p3 = { x: 710, y: 495 };
    n.moveTo(p0.x, p0.y);
    for (let i = 1; i <= 32; i++) {
      const t = i / 32;
      const u = 1 - t;
      const x = u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x;
      const y = u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y;
      n.lineTo(x, y);
    }
    n.strokePath();
  }

  drawCornerPlanet(g, x, y, r) {
    for (let i = 0; i < 8; i++) {
      g.fillStyle(i % 2 ? 0x061946 : 0x0c2a64, 0.24);
      g.fillCircle(x - i * 2, y + i * 2, r - i * 8);
    }
    g.lineStyle(2, 0x237cff, 0.34); g.strokeCircle(x, y, r * .92);
  }

  update(delta = 16) {
    for (const s of this.stars) {
      s.y += s.speed * delta / 1000;
      s.alpha += Math.sin((s.y + s.x) * 0.025) * 0.004;
      if (s.y > this.h + 6) { s.y = -6; s.x = Phaser.Math.Between(0, this.w); }
    }
  }
}
