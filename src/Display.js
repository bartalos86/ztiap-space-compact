import { Background } from "./Models/Background.js";


class Display {
    constructor(canvasName) {
        this.canvas = document.getElementById(canvasName);
        this.ctx = this.canvas.getContext("2d");

        this.init();
        window.onresize = () => this.init();

    }

    relativeToAbsoulePos(relativeX, width) {
        switch (relativeX) {
            case "left":
                return 0;
            case "right": return this.width;
            case "center": return this.width / 2 - width / 2;
        }
    }

    relativeToAbsoulePosText(relativeX, text) {
        let textwidth = this.ctx.measureText(text).width;
       
        switch (relativeX) {
            case "left":
                return 0;
            case "right": return this.width;
            case "center": return this.width / 2;
        }
    }

    init() {
        this.canvas.height = 720;
        this.canvas.width = 1280;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.fillStyle = "white";
        this.ctx.font = "60pt pixel";
    }

    async drawScreen(screen) {

        await this.renderBackground(0, screen.background);

        let widgets = screen.getWidgets();

        for (let i = 0; i < widgets.length; i++) {
            let widget = widgets[i];

            if (widget.type == "button")
                await this.drawButton(widget);

            if (widget.type == "text")
                await this.drawTextWidget(widget);

        }

    }

    async drawTextWidget(widget) {
        this.ctx.font = `${widget.fontSize} ${widget.fontFamily}`;

        if (typeof (widget.posX) == 'string') {
            widget.setX(this.relativeToAbsoulePosText(widget.posX, widget.text));
        }
       
        this.printText(widget.text, widget.posX, widget.posY);
    }

    async drawButton(widget) {


        if (typeof (widget.posX) == 'string') {
            widget.setX(this.relativeToAbsoulePos(widget.posX, widget.width));
        }

        if (widget.getMouseOver()) {
            this.ctx.fillStyle = "yellow";
        } else {
            this.ctx.fillStyle = "white";
        }

        this.ctx.drawImage(widget.getDrawable(), widget.posX, widget.posY, widget.width, widget.height);
        this.ctx.font = `${widget.getText().fontSize} ${widget.getText().fontFamily}`;
        this.printText(widget.getText().text, widget.posX + widget.width / 2, widget.posY + widget.height / 2 + 10);

    }

    async drawSprite(gameObj) {


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

        this.printText("Space compact", this.width / 2, 80);


    }

    async renderBackground(offsetX, background = "/src/assets/background/bg3.svg") {
        //dddthis.ctx.clearRect(0, 0, this.width, this.height);
        offsetX = offsetX % this.width;
        let size = 200;
        let bg = new Background(background, this.width, this.height);
        for (let i = 0; i < this.width *2; i += size) {
            for (let j = 0; j < this.height; j += size) {
                this.ctx.drawImage(await bg.getDrawable(), bg.position.getX() + i + offsetX, bg.position.getY() + j,
                    size, size);
            }
        }

    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    printText(text, posX, posY) {
        let textwidth = this.ctx.measureText(text).width;
        this.ctx.fillText(text, posX - textwidth / 2, posY);

    }

    getCanvas() {
        return this.canvas;
    }


}

export { Display }