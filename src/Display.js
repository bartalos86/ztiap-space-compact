import { Background } from "./Models/Background.js";


class Display {
    constructor(canvasName) {
        this.canvas = document.getElementById(canvasName);
        this.ctx = this.canvas.getContext("2d");

        this.init();
        window.onresize = () => this.init();

    }

    init() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.fillStyle = "white";
        this.ctx.font = "30pt pixel";
    }

    async drawSprite(gameObj, delta) {
        //this.ctx.clearRect(0, 0, this.width, this.height);

        if (gameObj.position.getX() + gameObj.width > this.width) {
            gameObj.position.setX(0);
        } else if (gameObj.position.getX() < 0) {
            gameObj.position.setX(this.width - gameObj.width);
        }

        if (gameObj.position.getY() + gameObj.height > this.height) {
            gameObj.position.setY(0);
        } else if (gameObj.position.getY() < 0) {
            gameObj.position.setY(this.height - gameObj.height);
        }
        //TODO: Separate this
        let animation = gameObj.getAnimation();

        if (animation) {
            this.ctx.drawImage(await gameObj.getDrawable(), animation.getNextAnimationFramePos().start, 0, animation.getFrameWidth(), animation.getFrameHeight(),
                gameObj.position.getX(), gameObj.position.getY(),
                gameObj.width, gameObj.height);
        } else {
            this.ctx.drawImage(await gameObj.getDrawable(), gameObj.position.getX(), gameObj.position.getY(),
                gameObj.width, gameObj.height);
        }

        this.printText("Space compact", this.width / 2, 50);


    }

    async renderBackground(offsetX) {
        //dddthis.ctx.clearRect(0, 0, this.width, this.height);
        offsetX = offsetX % this.width;
        let size = 150;
        let bg = new Background("/src/assets/background/bg.svg", this.width, this.height);
        for (let i = 0; i < this.width * 2; i += size) {
            for (let j = 0; j < this.height; j += size) {
                this.ctx.drawImage(await bg.getDrawable(), bg.position.getX() + i + offsetX, bg.position.getY() + j,
                    size, size);
            }
        }

    }

    printText(text, posX, posY) {
        let textwidth = this.ctx.measureText(text).width;
        this.ctx.fillText(text, posX - textwidth / 2, posY);

    }


}

export { Display }