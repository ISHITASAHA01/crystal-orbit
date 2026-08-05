import Phaser from "phaser";
import SceneKeys from "../core/SceneKeys";
import LayoutManager from "../managaer/LayoutManager";
import DeviceManager from "../managaer/DeviceManager";
import Button from "../UI/Button";


export default class MenuScene extends Phaser.Scene {

    constructor() {
        super(SceneKeys.MENU);
    }

    create() {
        console.log("Menu Scene Loaded");
        this.layout = new LayoutManager(this);
        this.device = new DeviceManager(this);
        this.title = this.add.text(
            this.scale.width / 2,
            this.scale.height * 0.25,
            "Crystal Orbit",
            {
                fontSize: "60px",
                color: "#ff0000"
            }
        ).setOrigin(0.5);

        console.table({
            Width: this.device.width,
            Height: this.device.height,
            Portrait: this.device.isPortrait,
            Landscape: this.device.isLandscape,
            Mobile: this.device.isMobile,
            Desktop: this.device.isDesktop,
            Touch: this.device.isTouch
        });

        this.playButton = new Button(
            this,
            this.scale.width / 2,
            this.scale.height / 2 + 100,
            "PLAY",
            () => {
                this.scene.start(SceneKeys.GAME);
            }
        );
        this.scale.on("resize", this.onResize, this);
    }
    onResize(gameSize) {

        const width = gameSize.width;
        const height = gameSize.height;

        this.title.setPosition(
            width / 2,
            height * 0.25
        );

        this.playButton.setPosition(
            width / 2,
            height * 0.55
        );

    }
}