export default class LayoutManager {

    constructor(scene) {

        this.scene = scene;
    }

    center(gameObject) {

        gameObject.setPosition(this.scene.scale.width * 0.5,this.scene.scale.height * 0.5);
        return gameObject;
    }

    top(gameObject, offset = 30) {

        gameObject.setPosition(

            this.scene.scale.width * 0.5,

            offset

        );

        return gameObject;
    }

    bottom(gameObject, offset = 30) {

        gameObject.setPosition(

            this.scene.scale.width * 0.5,

            this.scene.scale.height - offset

        );

        return gameObject;
    }

    left(gameObject, offset = 30) {

        gameObject.x = offset;

        return gameObject;
    }

    right(gameObject, offset = 30) {

        gameObject.x = this.scene.scale.width - offset;

        return gameObject;
    }

}