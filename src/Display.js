import { PositionHelper } from "./PosiotionHelper.js";
import { Background } from "./Models/Background.js";


class Display {
    constructor(canvasName) {
        this.canvas = document.getElementById(canvasName);
        this.ctx = this.canvas.getContext("2d");

        this.init();
        window.onresize = () => this.init();
        this.delta = 1;
    }



    init() {
        this.canvas.height = 720;
        this.canvas.width = 1280;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.fillStyle = "white";
        this.ctx.font = "60pt pixel";

        this.positionHelper = new PositionHelper(this.canvas);

    }

    async drawScreen(screen) {

        //this.clear();

        await this.renderBackground(0, screen.background);

        let widgets = screen.getWidgets();

        for (let i = 0; i < widgets.length; i++) {
            let widget = widgets[i];

            await this.renderWidget(widget);

        }

    }

    async renderWidget(widget) {
        if (widget.type == "button")
            await this.drawButton(widget);

        if (widget.type == "text")
            await this.drawTextWidget(widget);

        if (widget.type == "image")
            await this.drawImageWidget(widget);

        if (widget.type == "progressbar") {
            await this.drawProgressbar(widget);
        }

        if (widget.type == "health")
            await this.drawHealth(widget);
    }

    async drawTextWidget(widget) {
        this.ctx.font = `${widget.fontSize} ${widget.fontFamily}`;
        let parent = widget.getParent();
        let shadow = widget.getTextShadow();

        this.positionHelper.normalizeWidgetPositions(widget, parent);

        let posX, posY;
        if (parent) {
            posX = parent.posX + widget.posX;
            posY = parent.posY + widget.posY;
        } else {
            posX = widget.posX;
            posY = widget.posY;
        }

        if (shadow) {
            this.printText(widget.text, posX + shadow.offsetX, posY + shadow.offsetY, shadow.color);
            this.ctx.fillStyle = widget.color;
        }

        this.printText(widget.text, posX, posY);

    }

    async drawImageWidget(widget) {

        let parent = widget.getParent();

        this.positionHelper.normalizeWidgetPositions(widget, parent);

        if (widget.getRotation() % 360 != 0) {
            this.ctx.save();
            //this.ctx.translate(widget.posX + widget.width / 2, widget.posY + widget.height / 2);
            this.ctx.rotate(widget.getRotation() * Math.PI / 360);
        }

        let posX, posY;
        if (parent) {
            posX = parent.posX + widget.posX;
            posY = parent.posY + widget.posY;
        } else {
            posX = widget.posX;
            posY = widget.posY;
        }

        if (widget.isAnimated()) {
            let animation = widget.getAnimation();

            await this.renderAnimation(widget, animation, { x: posX, y: posY }, { width: widget.width, height: widget.height });
        } else {
            this.ctx.drawImage(widget.getDrawable(), posX, posY, widget.width, widget.height);

        }

        if (widget.getRotation() % 360 != 0) {
            this.ctx.restore();
        }
    }

    async renderAnimation(IDrawable, animation, position, size) {
        animation.setDelta(this.delta);
        this.ctx.drawImage(await IDrawable.getDrawable(), animation.getNextAnimationFramePos().start, 0, animation.getFrameWidth(), animation.getFrameHeight(),
            position.x, position.y,
            size.width, size.height);
    }

    async drawButton(widget) {

        this.positionHelper.normalizeWidgetPositions(widget);

        if (widget.getMouseOver()) {
            this.ctx.fillStyle = "yellow";
        } else {
            this.ctx.fillStyle = "white";
        }

        if (widget.getHoverBackground() && widget.getMouseOver())
        this.ctx.drawImage(widget.getHoverBackground(), widget.posX, widget.posY, widget.width, widget.height);
    else
        this.ctx.drawImage(widget.getBackground(), widget.posX, widget.posY, widget.width, widget.height);



        if (widget.getContent()) {
            if (widget.getMouseOver() && widget.getHoverContent())
                await this.renderWidget(widget.getHoverContent());
            else
                await this.renderWidget(widget.getContent());

        }
        //this.ctx.font = `${widget.getText().fontSize} ${widget.getText().fontFamily}`;
        //this.printText(widget.getContent().text, widget.getContent().posX + widget.posX + widget.width / 2, widget.getContent().posY + widget.posY + widget.height / 2 + 10);

        this.ctx.fillStyle = "white";

    }

    async drawProgressbar(widget) {
        this.positionHelper.normalizeWidgetPositions(widget);
        // console.log(widget.getProgressWidth());

        this.ctx.drawImage(widget.getBackDrawable(), widget.posX, widget.posY, widget.width, widget.height);
        this.ctx.drawImage(widget.getProgressDrawable(), widget.posX, widget.posY, widget.getProgressWidth(), widget.height);

    }

    async drawHealth(widget) {
        this.positionHelper.normalizeWidgetPositions(widget);
        //console.log(widget);
        let prevPos = widget.posX;
        for (let i = 0; i < widget.getCurrentHealth(); i++){
            
            this.ctx.drawImage(widget.getDrawable(), prevPos , widget.posY, widget.getSingleSize(), widget.height);

            prevPos += widget.getMargin();
        }
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
            await this.renderAnimation(gameObj, animation, { x: gameObj.position.getX(), y: gameObj.position.getY() },
                { width: gameObj.width, height: gameObj.height });
        } else {
            this.ctx.drawImage(await gameObj.getDrawable(), gameObj.position.getX(), gameObj.position.getY(),
                gameObj.width, gameObj.height);
        }

        /*this.ctx.font = "60pt arcade";
        this.printText("Space compact", this.width / 2, 80);*/


    }

    async renderBackground(offsetX, background = "/src/assets/background/bg.svg") {
        //dddthis.ctx.clearRect(0, 0, this.width, this.height);
        offsetX = offsetX % this.width;
        let size = 200;
        let bg = new Background(background, this.width, this.height);
        for (let i = 0; i < this.width * 2; i += size) {
            for (let j = 0; j < this.height; j += size) {
                this.ctx.drawImage(await bg.getDrawable(), bg.position.getX() + i + offsetX, bg.position.getY() + j,
                    size, size);
            }
        }

    }

    setDelta(delta) {
        this.delta = delta;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    printText(text, posX, posY, color = null) {

        if (color != null)
            this.ctx.fillStyle = color;

        let textwidth = this.ctx.measureText(text).width;
        this.ctx.fillText(text, posX - textwidth / 2, posY);

    }

    getCanvas() {
        return this.canvas;
    }


}

export { Display }