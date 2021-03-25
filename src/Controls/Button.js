import { Widget } from "./Widget.js";
import { Text } from "./Text.js";
import { ImageWidget } from "./Image.js";

export class Button extends Widget {

    constructor(posX, posY, width, height, background, content) {
        super(posX, posY, width, height, "button");
        this.background = background;

        this.setChild(content);
        this.onclick = [];

        let img = new Image(this.width, this.height);
        img.src = this.background;
        this.background = img;
    }

    getContent() {
        return this.getChild();
    }


    getBackground() {
        return this.background;
    }

    /*getText() {
         return this.text;
     }*/

    addOnClick(event) {
        this.onclick.push(event);
    }

    click() {
        for (let i = 0; i < this.onclick.length; i++)
            this.onclick[i]();
        
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


export class ImageButton extends Button {
    constructor(posX, posY, width, height, imagePath, imageSize) {
       let content = new ImageWidget(imagePath, 0, 0, imageSize, imageSize);

        super(posX, posY, width, height, "/src/assets/ui/button.png", content);
        
    }


}

export class TextButton extends Button {
    constructor(posX, posY, width, height, text) {
        let content = text;

        if (typeof (text) == 'string')
            content = new Text(text, "center", "center", "20px");

        super(posX, posY, width, height, "/src/assets/ui/button.png", content);

    }
}

export class ToggleButton extends Button{
    
    constructor(posX, posY, width, height, content, contentToggled) {
        super(posX, posY, width, height, "/src/assets/ui/button.png", content);
        this.addOnClick(() => this.toggle());
      //  this.addOnClick(() => console.log("clicked"));
        this.toggled = false;
        this.baseContent = content;
        this.toggledContent = contentToggled;
    }

    toggle() {
        this.toggled = !this.toggled;
        console.log(this.toggled);
        if (this.toggled) {
            this.setChild(this.toggledContent)
        } else {
            this.setChild(this.baseContent);
        }
    }



}