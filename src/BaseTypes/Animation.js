export class Animation2D{

    constructor(spWidth, spHeight, cols, animationSpeed = 1) {
        //this.spritesheetPath = spritesheetPath;
        this.spWidth = spWidth;
        this.spHeight = spHeight;
        this.cols = cols;
        this.currentFrame = 0;
        this.animationSpeed = animationSpeed;
        this.delta = 1;
    }

    setDelta(delta) {
        this.delta = delta;
    }


    getNextAnimationFramePos() {
        if (this.currentFrame >= this.cols) {
            this.currentFrame = 0;
        }

        let frameStart = Math.floor(this.currentFrame) * this.spWidth;
        this.currentFrame += this.animationSpeed/this.delta;
        return { start: frameStart, width: this.spWidth, height: this.spHeight };
    }

    getFrameWidth() {
        return this.spWidth-1;
    }

    getFrameHeight() {
        return this.spHeight;
    }

}

export class EffectAnimation{

    constructor(imagePath, timeout = 250, animation2D = null) {
        this.imagePath = imagePath;
        this.timeout = timeout;
        this.animation2D = animation2D;
    }

    getAnimation2D() {
        return this.animation2D;
    }

}