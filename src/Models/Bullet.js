import { Vector2D } from "../BaseTypes/Vector.js";
import { Sprite } from "./Sprite.js";

export class Bullet extends Sprite {
    constructor(x, y, owner, speed = 15) {
        let path = "/src/assets/sprites/projectile_e.png";

        if (owner == "player") 
            path = "/src/assets/sprites/projectile.png";
       

        super(path,8*2,8*2);
        this.owner = owner;
        this.speed = speed;
        this.position = new Vector2D(x, y);
        this.isAlive = true;

    }

    move(delta) {
        if (this.owner == "player") {
            this.position.setX(this.position.getX() + this.speed/delta)
        } else {
            this.position.setX(this.position.getX() - this.speed/delta)
        }
    }

    getPosition() {
        return this.position;
    }

    destroy() {
        this.isAlive = false;
    }

    getIsAlive() {
        return this.isAlive;
    }
}