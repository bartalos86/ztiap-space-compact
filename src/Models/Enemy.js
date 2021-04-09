import { EffectAnimation } from "../BaseTypes/Animation.js";
import { AdvancedTimer, Timer } from "../BaseTypes/Timer.js";
import { Vector2D } from "../BaseTypes/Vector.js";
import { GameObject } from "./GameObject.js";

export class EnemyBase extends GameObject {

    constructor(sprite, size, health, maxVMovement, vSpeed) {
        super(sprite, size, size);
        this.position = new Vector2D(1300, Math.random() * 150 + 150);
        this.maxVerticalMovement = maxVMovement;
        this.currentVMovement = 0;
        this.directionV = 1;
        this.speedV = vSpeed;
        this.health = health;
        this.isAlive = true;

        this.gunPositions = [];
        this.agression = Math.random() * 50;
        this.speed = this.agression % 35;

        this.agressionCooldown = new Timer((100-this.agression) * 500);
        this.fireCooldown = new Timer((100 - this.agression) * 500)
    }

    /*setHitImage(imagePath, showTime = 200) {
       
    }*/

    
    setAgression(agression) {
        if (agression <= 100) {
            this.agression = Math.random()*agression;
            this.agressionCooldown = new Timer((10 - this.agression) * 500);
            this.fireCooldown = new Timer((20 - this.agression) * 1000)

        }
    }

    getAgression() {
        return this.agression;
    }

    setupManagers(gameManager, audioManager) {
        this.gameManager = gameManager;
        this.audioManager = audioManager;
    }

    hit(amout) {
        /*if (this.audioManager)
            this.audioManager.playEffect("hit");*/

        this.health -= amout;
        if (this.health <= 0) {
            this.die();
        }
            this.playAnimation("hit");
    }

    die() {
        if (this.audioManager)
                this.audioManager.playEffect("explosion");
            this.isAlive = false;
    }

    shoot() {

        if (this.agressionCooldown.activate()) {
            if (this.audioManager)
                this.audioManager.playEffect("shoot");

            for (let i = 0; i < this.gunPositions.length; i++) {
                let gun = this.gunPositions[i];
                let pos = this.position;
                let calculated = { x: pos.getX() + gun.getX(), y: pos.getY() + gun.getY() };
                this.gameManager.spawnBullet("enemy", calculated);



            }
        }

    }

    move(delta) {
        if (this.currentVMovement >= this.maxVerticalMovement || this.currentVMovement <= -this.maxVerticalMovement) {
            this.directionV *= -1;
        }

        this.position.setY(this.position.getY() + Math.round(this.speedV * this.directionV / delta));

        this.currentVMovement += Math.round(this.speedV * this.directionV / delta);

        this.position.setX(this.position.getX() - this.speed / delta);

        /* if (this.position.getX() + this.width < 0)
             this.isAlive = false;*/
    }

    destroy() {
        this.isAlive = false;
    }

    getIsAlive() {
        return this.isAlive;
    }
}

export class DefaultEnemy extends EnemyBase {

    constructor() {
        super("/src/assets/sprites/enemy1.png", 65, 100, 200, 10);
        this.gunPositions.push(new Vector2D(0, 65 / 2 - 8));
        this.addAnimation("hit", new EffectAnimation("/src/assets/sprites/enemy1-hit.png"))
    }

}

export class StrongEnemy extends EnemyBase {

    constructor() {
        super("/src/assets/sprites/enemy-stronger.png", 65, 200, 50, 10);
        this.gunPositions.push(new Vector2D(0, 65 / 2 - 8));
        this.addAnimation("hit", new EffectAnimation("/src/assets/sprites/enemy-stronger-hit.png"))

    }



}

export class StarEnemy extends EnemyBase {

    constructor() {
        super("/src/assets/sprites/enemy2.png", 60, 200, 100, 0);
        this.gunPositions.push(new Vector2D(0, 60 / 2 - 8));
        this.addAnimation("hit", new EffectAnimation("/src/assets/sprites/enemy2-hit.png"))

    }

}