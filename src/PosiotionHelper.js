export class PositionHelper {

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.canvas = canvas;
    }


    relativeToAbsoulePos(relativeX, width) {
        switch (relativeX) {
            case "left":
                return 0;
            case "right": return this.width - width -20;
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

    //Relative fro nested text components

    relativeToParentPosTextX(parent, textWidget) {
        let textwidth = this.ctx.measureText(textWidget.text).width;

        switch (textWidget.posX) {
            case "left":
                return parent.posX;
            case "right": return parent.width - textwidth;
            case "center": return parent.width / 2;
        }
    }

    relativeToParentPosTextY(parent, textWidget) {
        let metrics = this.ctx.measureText(textWidget.text);
        let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        switch (textWidget.posY) {
            case "top":
                return parent.posY;
            case "bottom": return parent.posY + parent.height;
            case "center": return parent.height / 2 + actualHeight/2;
        }
    }


     //Relative fro nested components width size

     relativeToParentPosX(parent, widget) {
       
        switch (widget.posX) {
            case "left":
                return parent.posX;
            case "right": return parent.width - widget.width/2;
            case "center": return parent.width / 2 - widget.width/2;
        }
    }

    relativeToParentPosY(parent, widget) {
       
        switch (widget.posY) {
            case "top":
                return parent.posY;
            case "bottom": return parent.posY + parent.height/2;
            case "center": return parent.height / 2 - widget.height/2;
        }
    }
}