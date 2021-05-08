import { Timer, OnTimer } from "../BaseTypes/Timer.js";
import { Vector2D } from "../BaseTypes/Vector.js";
import { GameObject } from "./GameObject.js";
import { EffectAnimation } from "../BaseTypes/Animation.js";
import {Sprite } from "./Sprite.js"

export class Boss extends GameObject {

    constructor() {
        super("/src/assets/sprites/boss1.png", 84*5, 127*5);
        this.moveTimer = new OnTimer(15000,1500);
        this.fireCooldown = new OnTimer(4000, 1000);
        this.bulletCooldown = new Timer((200));
        this.position = new Vector2D(870, 700 / 2 - 127 *2.5);
        this.speed = 25;
        this.maxHealth = 2000;
        this.health = this.maxHealth;
        this.type = "boss";

        this.isAlive = true;


        this.maxVerticalMovement = 50;
        this.currentVMovement = 0;
        this.directionV = 1;


        this.gunPositions = [new Vector2D(85, 285),new Vector2D(250, 310), new Vector2D(85, 350)];

        this.addAnimation("hit", new EffectAnimation("/src/assets/sprites/boss_hit.png"));
    }

    setupManagers(gameManager, audioManager) {
        this.gameManager = gameManager;
        this.audioManager = audioManager;
    }

    shoot() {

        if (this.moveTimer.isInProgress)
            return;
        
        if (this.bulletCooldown.activate()) {
            
     
            if (this.audioManager)
                this.audioManager.playEffect("boss-attack");

            for (let i = 0; i < this.gunPositions.length; i++) {
                let gun = this.gunPositions[i];
                let pos = this.position;
                let calculated = { x: pos.getX() + gun.getX(), y: pos.getY() + gun.getY() };
                this.gameManager.spawnBullet("boss", calculated);

            }

        }

            
    }

    hit(amout) {
        if (this.audioManager)
            this.audioManager.playEffect("shot");

        this.health -= amout;
        if (this.health <= 0) {
            this.die();
        }

        this.playAnimation("hit");
    }

    die() {
        if (this.audioManager)
            this.audioManager.playEffect("boss-defeat");

        //this.playAnimation("explode");
        this.destroy();
    }

    move(delta) {
        if (this.moveTimer.activate()) {
            if (this.currentVMovement >= this.maxVerticalMovement || this.currentVMovement <= -this.maxVerticalMovement) {
                this.directionV *= -1;
            }

            this.position.setY(this.position.getY() + Math.round(this.speed * this.directionV / delta));

            this.currentVMovement += Math.round(this.speed * this.directionV / delta);
        }
        //this.position.setY(this.position.getY() + this.speed / delta);
    }

    destroy() {
        this.isAlive = false;
    }

    getIsAlive() {
        return this.isAlive;
    }

    getHealth() {
        return this.health;
    }

    getMaxHealth() {
        return this.maxHealth;
    }

    getIsAlive() {
        return this.isAlive;
    }

    getPoints() {
        return 500;
    }

    getHitbox() {
        return { xStart: this.position.getX() + 250, yStart: this.position.getY() + 260, width: 200, height: 100 };
    }

}