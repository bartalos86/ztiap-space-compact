import { Widget } from "./Widget.js";

export class Progressbar extends Widget{

    constructor(fillPath, bgPath, posX, posY, width, height) {
        super(posX, posY, width, height, "progressbar");

        this.fill = new Image();
        this.fill.src = fillPath;

        this.bg = new Image();
        this.bg.src = bgPath;

        this.percentage = 0;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
    }

    getProgressWidth() {
        return (this.width * (this.percentage / 100));
    }

    getBackDrawable() {
        return this.bg;
    }

    getProgressDrawable() {
        return this.fill;
    }
}

export class DefaultProgressbar extends Progressbar{
    constructor(posX, posY, width, height) {
        super("/src/assets/ui/progress-fg.png", "/src/assets/ui/progress-bg.png", posX, posY, width, height);
    }
}