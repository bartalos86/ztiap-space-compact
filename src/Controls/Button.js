import { Widget } from "./Widget.js";
import { Text } from "./Text.js";

export class Button extends Widget {

    constructor(posX, posY, width, height, background, text) {
        super(posX, posY, width, height, "button");
        this.background = background;

        if (typeof (text) == 'string')
            this.text = new Text(text, 0, 0, "30px");
        else
            this.text = text;

        let img = new Image(this.width, this.height);
        img.src = this.background;
        this.drawable = img;
    }


    getDrawable() {
        return this.drawable;
    }

    getText() {
        return this.text;
    }

    addOnClick(event) {
        this.onclick = event;
    }

    click() {
        this.onclick();
    }

    setMouseOver(state) {
        this.isMouseOver = state;
    }

    getMouseOver() {
        return this.isMouseOver;
    }

    notify(event) {




    }

}