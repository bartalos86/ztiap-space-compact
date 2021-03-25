import { Widget } from "./Widget.js"

export class ImageWidget extends Widget {


    constructor(path, posX, posY, width, height, rotation = 0) {
        super(posX, posY, width, height, "image");
        let image = new Image();
        image.src = path;
        this.drawable = image;
        this.rotation = rotation;
        this.animated = false;
    }

    setRotation(rotation) {
        this.rotation = rotation;
    }

    isAnimated() {
        return this.animated;
    }

    getRotation() {
        return this.rotation;
    }


    getDrawable() {
        return this.drawable;
    }
}

export class AnimatedImageWidget extends ImageWidget{
    constructor(path, posX, posY, width, height, animation, rotation = 0) {
        super(path, posX, posY, width, height, rotation);
        this.animation = animation;
        this.animated = true;

    }

    

    getAnimation() {
        return this.animation;
    }
}