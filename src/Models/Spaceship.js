import { Vector2D } from "../BaseTypes/Vector.js";
import {Sprite} from "./Sprite.js";

export class Spaceship extends Sprite{

    constructor() {
        super("/src/assets/sprites/spaceship2.png", 75, 75);
        this.position = new Vector2D(100, 100);
    }

    

}