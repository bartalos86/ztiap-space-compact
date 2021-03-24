import { Widget } from "./Widget.js"

export class ImageWidget extends Widget {


    constructor(path, posX, posY, width, height, rotation = 0) {
        super(posX, posY, width, height, "image");
        let image = new Image();
        image.src = path;
        this.drawable = image;
        this.rotation = rotation;
    }

    setRotation(rotation) {
        this.rotation = rotation;
    }

    getRotation() {
        return this.rotation;
    }


    getDrawable() {
        return this.drawable;
    }
}