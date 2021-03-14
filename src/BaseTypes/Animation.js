export class Animation2D{

    constructor(spritesheetPath, spWidth, spHeight, cols, animationSpeed = 1) {
        this.spritesheetPath = spritesheetPath;
        this.spWidth = spWidth;
        this.spHeight = spHeight;
        this.cols = cols;
        this.currentFrame = 0;
        this.animationSpeed = animationSpeed;
    }


    getNextAnimationFramePos() {
        if (this.currentFrame >= this.cols) {
            this.currentFrame = 0;
        }

        let frameStart = Math.floor(this.currentFrame) * this.spWidth;
        this.currentFrame += this.animationSpeed;
        return { start: frameStart, width: this.spWidth, height: this.spHeight };
    }

    getFrameWidth() {
        return this.spWidth;
    }

    getFrameHeight() {
        return this.spHeight;
    }

}