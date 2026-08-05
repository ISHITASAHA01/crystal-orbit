export default class DeviceManager {

    constructor(scene) {

        this.scene = scene;

        // this.update();

        scene.scale.on("resize", () => {

            this.update();

        });

    }

    update() {

        this.width = this.scene.scale.width;
        this.height = this.scene.scale.height;

        this.isPortrait = this.height >= this.width;
        this.isLandscape = !this.isPortrait;

        this.aspectRatio = this.width / this.height;

        this.pixelRatio = window.devicePixelRatio || 1;

        this.isTouch = this.scene.sys.game.device.input.touch;

        this.isDesktop = this.scene.sys.game.device.os.desktop;

        this.isMobile = !this.isDesktop;
    }

}