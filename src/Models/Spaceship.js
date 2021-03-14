import { Vector2D } from "../BaseTypes/Vector.js";
import {Sprite} from "./Sprite.js";
import {Animation2D} from "../BaseTypes/Animation.js";

export class Spaceship extends Sprite{

    constructor() {
        let animation = new Animation2D("/src/assets/sprites/spaceship-sprite.png",32,32,5,0.3);
        super("/src/assets/sprites/spaceship-sprite.png", 75, 75, animation);
        this.position = new Vector2D(100, 100);
    }

    

}