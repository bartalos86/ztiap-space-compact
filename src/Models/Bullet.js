import { Timer } from "../BaseTypes/Timer.js";
import { Vector2D } from "../BaseTypes/Vector.js";
import { Sprite } from "./Sprite.js";

export class ProjectileBase extends Sprite {

    constructor(imagePath, x, y, width, height, speed = 35, damage = 10, animation = null) {
        super(imagePath, width, height, animation);
        this.position = new Vector2D(x, y);
        this.isAlive = true;
        this.speed = speed;
        this.damage = damage;

        this.type = "base";

    }

    getDamage() {
        return this.damage;
    }

    setOnMove(onmoveFunction) {
        this.onmove = onmoveFunction;
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

export class Bullet extends ProjectileBase {
    constructor(x, y, owner, speed = 35,damage = 10, sizeMultiplier = 1) {
        let path = "/src/assets/sprites/projectile_e.png";


        if (owner == "player")
            path = "/src/assets/sprites/projectile.png";

        super(path, x, y, 8 * 2.4 * sizeMultiplier, 8 * 2.4 * sizeMultiplier, speed, damage);

        this.owner = owner;
        this.id = Date.now();


    }

    move(delta) {
        if (this.owner == "player") {
            this.position.setX(this.position.getX() + this.speed / delta)
        } else {
            this.position.setX(this.position.getX() - this.speed / delta)
        }

        if (this.onmove)
            this.onmove();
    }

}

export class Rocket extends ProjectileBase {
    constructor(x, y, speed = 75) {
        super("/src/assets/sprites/rocket.png", x, y, 72/1.5, 36/1.5, speed,300);

    }

    move(delta) {

        this.position.setX(this.position.getX() + this.speed / delta)

        if (this.onmove)
            this.onmove();
    }


}

export class Laser extends ProjectileBase{
    constructor(x, y) {
        super("/src/assets/sprites/laser.png", x, y, 1300, 15, 0,10);
        this.type = "laser";

        this.lives = 1;
    }

    move(delta) {

        this.lives--;
        
        if (this.lives < 0)
            this.destroy();
        
        if (this.onmove)
            this.onmove();
    }
}