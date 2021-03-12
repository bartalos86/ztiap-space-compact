import { Vector2D } from "../BaseTypes/Vector.js";
import { Sprite } from "./Sprite.js";

export class Background extends Sprite{
    constructor(imagePath, size) {
        super(imagePath, size, size);
        this.position = new Vector2D(0,0);
    }
}