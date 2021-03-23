import { Observable } from "../BaseTypes/Observable.js";

export class BaseWidget extends Observable {
    constructor(posX, posY, type) {
        super();
        this.posX = posX;
        this.posY = posY;
        this.type = type;
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