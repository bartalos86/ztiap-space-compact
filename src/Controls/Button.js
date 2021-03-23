import { Widget } from "./Widget.js";
import { Text } from "./Text.js";

export class Button extends Widget {

    constructor(posX, posY, width, height, background, text) {
        super(posX, posY, width, height, "button");
        this.background = background;
        this.text = new Text(text,posX, posY, "30px");

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