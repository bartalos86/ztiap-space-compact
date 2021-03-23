import { BaseWidget } from "./Widget.js";

export class Text extends BaseWidget{
    constructor(text, posX, posY, fontSize, fontFamily = "pixel") {
        super(posX, posY, "text");
        this.text = text;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
    }

   
}