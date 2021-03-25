import { Observable } from "../BaseTypes/Observable.js";

export class BaseWidget extends Observable {
    constructor(posX, posY, type, parent = null, child = null) {
        super();
        this.posX = posX;
        this.posY = posY;
        this.type = type;
        this.parent = parent;
        this.child = child;

    }

    setX(x) {
        this.posX = x;
    }

    setY(y) {
        this.posY = y;
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }


    setChild(child) {
        child.setParent(this)
        this.child = child;

    }

    setParent(parent) {
        this.parent = parent;
    }


    getChild() {
        return this.child;
    }

    getParent() {
        return this.parent;
    }

    getType() {
        return this.type;
    }

}
export class Widget extends BaseWidget {

    constructor(posX, posY, width, height, type) {
        super(posX, posY, type);

        this.width = width;
        this.height = height;

    }






}