import { Vector2D } from "../BaseTypes/Vector.js";
import { Sprite } from "./Sprite.js";

export class EnemyBase extends Sprite{

    constructor(sprite, size, maxVMovement, vSpeed) {
        super(sprite, size, size);

        this.position = new Vector2D(Math.random() * 1280, Math.random() * 620);
        this.maxVerticalMovement = maxVMovement;
        this.currentVMovement = 0;
        this.directionV = 1;
        this.speedV = vSpeed;
    }

    move(delta) {
        if (this.currentVMovement >= this.maxVerticalMovement || this.currentVMovement <= -this.currentVMovement) {
            this.directionV *= -1;
        }

        this.position.setY(this.position.getY() + Math.round(this.speedV*this.directionV/delta));

        this.currentVMovement += Math.round(this.speedV * this.directionV/delta);
    }
}

export class DefaultEnemy extends EnemyBase{

    constructor() {
        super("/src/assets/sprites/enemy1.png", 65, 100, 15);
    }

}

export class StrongEnemy extends EnemyBase{

    constructor() {
        super("/src/assets/sprites/enemy-stronger.png", 65, 50, 10);
    }


    
}

export class StartEnemy extends EnemyBase{

    constructor() {
        super("/src/assets/sprites/enemy2.png", 60, 200, 50);
    }

}