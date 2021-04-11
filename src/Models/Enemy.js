import { Animation2D, EffectAnimation } from "../BaseTypes/Animation.js";
import { OnTimer,Timer } from "../BaseTypes/Timer.js";
import { Vector2D } from "../BaseTypes/Vector.js";
import { GameObject } from "./GameObject.js";

export class EnemyBase extends GameObject {

    constructor(sprite, size, health, maxVMovement, vSpeed, maxAgression = 50) {
        super(sprite, size, size);
        this.position = new Vector2D(1280, 720/2);
        this.maxVerticalMovement = maxVMovement;
        this.currentVMovement = 0;
        this.directionV = 1;
        this.speedV = vSpeed;
        this.health = health;
        this.isAlive = true;

        this.gunPositions = [];
        this.agression = Math.random() * maxAgression;
        this.speed = this.agression % 35;
        this.agressionDelta = 0;
        this.canMove = true;

        this.agressionCooldown = new Timer((100-this.agression) * 500);
        this.fireCooldown = new OnTimer((100 - this.agression) * 500, this.agression * 500)
      
        
    }

    initializeExplosionAnimation(image = "/src/assets/sprites/round-expl2.png") {
        let explosion = new EffectAnimation(image, 2000, new Animation2D(100, 100, 10, 0.3 * 30, 9),new Vector2D(-20,-20));

        this.addOnAnimationStarted("explode", () => { this.canMove = false; this.hasCollision = false, this.height = 100, this.width = 100});
        this.addOnAnimationCompleted("explode", () => this.isAlive = false);
        this.addAnimation("explode", explosion)
    }

    /*setHitImage(imagePath, showTime = 200) {
       
    }*/

    
    setAgression(agression) {
        agression += this.agressionDelta;
        if (agression <= 100) {
            this.agression = Math.random() * agression;
            this.speed = (this.agression + 5) % 50;
            
           // this.agressionCooldown = new OnTimer((100-this.agression) * 500,this.agression*10);
           this.agressionCooldown = new Timer((100-this.agression) * 500);

            this.fireCooldown = new OnTimer((100 - this.agression) * 500, this.agression*500)
        //this.fireCooldown = new Timer((100 - this.agression) * 1000)

        }
    }

    getAgression() {
        return this.agression;
    }

    getIsAlive() {
        return this.isAlive;
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
        //this.isAlive = false;
        
        this.playAnimation("explode");
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
        if (!this.canMove)
            return;

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
        super("/src/assets/sprites/enemy1.png", 65, 75, Math.random() * (700/4) +25, 10);
        this.gunPositions.push(new Vector2D(0, 65 / 2 - 8));
        this.addAnimation("hit", new EffectAnimation("/src/assets/sprites/enemy1-hit.png"))
        this.initializeExplosionAnimation();
    }

}

export class StrongEnemy extends EnemyBase {

    constructor(maxAgression = 50) {
        super("/src/assets/sprites/enemy-stronger.png", 65, 150, Math.random() * (150) + 25, 10,maxAgression);
        this.gunPositions.push(new Vector2D(0, 65 / 2 - 8));
        this.addAnimation("hit", new EffectAnimation("/src/assets/sprites/enemy-stronger-hit.png"))
        this.agressionDelta = 5;
        this.initializeExplosionAnimation();

    }



}

export class StarEnemy extends EnemyBase {

    constructor(maxAgression = 50) {
        super("/src/assets/sprites/enemy2.png", 60, 200, 100, 5, maxAgression);
        this.gunPositions.push(new Vector2D(0, 30 - 8));
        this.gunPositions.push(new Vector2D(30, 0));
        this.gunPositions.push(new Vector2D(30, 60-8));
        this.addAnimation("hit", new EffectAnimation("/src/assets/sprites/enemy2-hit.png"))
        this.agressionDelta = 20;
        this.initializeExplosionAnimation("/src/assets/sprites/round-expl.png");


        this.position = new Vector2D(1280, Math.random()*600+100);
    }

}