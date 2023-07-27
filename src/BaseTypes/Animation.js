export class Animation2D{

    constructor(spWidth, spHeight, cols, animationSpeed = 1, rows = 1) {
        //this.spritesheetPath = spritesheetPath;
        this.spWidth = spWidth;
        this.spHeight = spHeight;
        this.cols = cols;
        this.rows = rows;
        this.currentFrame = 0;
        this.currentRow = 0;
        this.animationSpeed = animationSpeed;
        this.delta = 1;
        //this.keepSize = keepSize;
    }

    setDelta(delta) {
        this.delta = delta;
    }


    getNextAnimationFramePos() {
        if (this.currentFrame >= this.cols) {
            this.currentFrame = 0;

            this.currentRow++;
        }

        if (this.currentRow >= this.rows) {
            this.currentRow = 0;
        }

        let frameStart = Math.floor(this.currentFrame) * this.spWidth;
        let frameStartY = Math.floor(this.currentRow) * this.spHeight;

        this.currentFrame += this.animationSpeed/this.delta;
        return { xstart: frameStart, ystart: frameStartY, width: this.spWidth, height: this.spHeight };
    }

    getFrameWidth() {
        return this.spWidth-1;
    }

    getFrameHeight() {
        return this.spHeight;
    }

}

export class EffectAnimation{

    constructor(imagePath, timeout = 250, animation2D = null, offset = null) {
        this.imagePath = imagePath;
        this.timeout = timeout;
        this.animation2D = animation2D;
        this.offset = offset;
    }

    getAnimation2D() {
        return this.animation2D;
    }

    getOffset() {
        return this.offset;
    }

}