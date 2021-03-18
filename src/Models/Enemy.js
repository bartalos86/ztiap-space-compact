import { Vector2D } from "../BaseTypes/Vector.js";
import { Sprite } from "./Sprite.js";

export class Enemy extends Sprite{

    constructor() {
        super("/src/assets/sprites/enemy1.png", 75, 75);

        this.position = new Vector2D(Math.random() * 500, Math.random() * 500);
        this.maxVerticalMovement = 100;
        this.currentVMovement = 0;
        this.directionV = 1;
        this.speedV = Math.random() * 15 +5;
    }

    move(delta) {
        if (this.currentVMovement >= this.maxVerticalMovement || this.currentVMovement <= -this.currentVMovement) {
            this.directionV *= -1;
        }

        this.position.setY(this.position.getY() + this.speedV*this.directionV/delta);

        console.log(this.currentVMovement);
        this.currentVMovement += this.speedV * this.directionV/delta;
    }
}