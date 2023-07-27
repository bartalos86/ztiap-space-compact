import { BaseWidget } from "./Widget.js";
import { TextShadow } from "../BaseTypes/TextShadow.js";

export class Text extends BaseWidget{
    constructor(text, posX, posY, fontSize, fontFamily = "pixel", color = "white", textShadow = null) {
        super(posX, posY, "text");
        this.text = text;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.textShadow = textShadow;
        this.color = color;

        if (textShadow != null) {
            this.hasShadow = true;
        }
    }

    getTextShadow() {
        return this.textShadow;
    }

    setText(text) {
        this.text = text;
    }

    setColor(color) {
        this.color = color;
    }

   
}

export class TextWithShadow extends Text{
    constructor(text, posX, posY, fontSize, fontFamily = "pixel", color = "white") {
        let textShadow = new TextShadow(2, 7, "black");
        super(text, posX, posY, fontSize, fontFamily,color,textShadow);
    }
}