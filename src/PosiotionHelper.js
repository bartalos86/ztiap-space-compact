export class PositionHelper {

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.canvas = canvas;
    }

    normalizeWidgetPositions(widget, parent = null) {

        if (widget.type == "text") {
            if (typeof (widget.posX) == 'string') {

                //Its a text component
                if (!parent)
                    widget.setX(this.relativeToAbsolutePosTextX(widget.posX, widget.text));
    
                //It has a parent
                if (parent) {
                    //let textWidth = this.ctx.measureText(widget.text).width;
                    widget.setX(this.relativeToParentPosTextX(parent, widget));
                }
            }
    
            if (typeof (widget.posY) == 'string') {
    
                //It has a parent
                if (parent) {
    
                    widget.setY(this.relativeToParentPosTextY(parent, widget));
                }
            }
        } else {
            
        if (typeof (widget.posX) == 'string') {
            if (!parent)
                widget.setX(this.relativeToAbsolutePosX(widget.posX, widget.width));

            if (parent) {
                widget.setX(this.relativeToParentPosX(parent, widget));
            }
        }

        if (typeof (widget.posY) == 'string') {

            if (!parent)
                widget.setY(this.relativeToAbsolutePosY(widget.posY, widget.height));

            if (parent) {
                widget.setY(this.relativeToParentPosY(parent, widget));
            }
        }
        }
        
    }


    relativeToAbsolutePosX(relativeX, width) {
        switch (relativeX) {
            case "left":
                return 0;
            case "right": return this.width - width -20;
            case "center": return this.width / 2 - width / 2;
        }
    }

    relativeToAbsolutePosY(relativeY, height) {
        switch (relativeY) {
            case "top":
                return 0;
            case "bottom": return this.height - height -20;
            case "center": return this.height / 2 - height / 2;
        }
    }

    relativeToAbsolutePosTextX(relativeX, text) {
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