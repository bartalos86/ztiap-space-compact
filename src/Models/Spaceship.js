import { Vector2D } from "../BaseTypes/Vector.js";
import { Sprite } from "./Sprite.js";
import { Animation2D } from "../BaseTypes/Animation.js";

export class SpaceshipBase extends Sprite {

    constructor(sprite, size, animation) {
        super(sprite, size, size, animation);
        this.position = new Vector2D(100, 100);
        this.speed = 10;
        this.firepower = 20;
    }

    move(direction, delta) {
        switch (direction) {
            case "forward":
                this.position.setX(this.position.getX() + this.speed / delta);
                console.log("here");
                break;
            case "backward":
                this.position.setX(this.position.getX() -this.speed / delta);
                break;

            case "up":
                this.position.setY(this.position.getY()  -this.speed / delta);
                break;

            case "down":
                this.position.setY(this.position.getY() + this.speed / delta);
                break;
        }

    }

}

export class FireSpaceship extends SpaceshipBase {

    constructor() {
        let animation = new Animation2D(32, 32, 5, 0.3);
        super("/src/assets/sprites/spaceship-sprite.png", 80, animation);
        this.speed = 10;
        this.firepower = 80;
    }
}

export class SpeedSpaceship extends SpaceshipBase {

    constructor() {
        let animation = new Animation2D(32, 32, 5, 0.3);
        super("/src/assets/sprites/spaceship_speed-sprite.png", 80, animation);
        this.speed = 25;
        this.firepower = 55;
    }
}