import { Vector2D } from "../BaseTypes/Vector.js";
import { Animation2D, EffectAnimation } from "../BaseTypes/Animation.js";
import { OnTimer, Timer } from "../BaseTypes/Timer.js";
import { GameObject } from "./GameObject.js";

export class SpaceshipBase extends GameObject {

    constructor(sprite, size, animation, cooldown = 250) {
        super(sprite, size, size, animation);
        this.type = "base";
        this.position = new Vector2D(100, 100);
        this.speed = 50;
        this.firepower = 20;
        this.cooldown = new Timer(cooldown);
        this.health = 100;
        this.isAlive = true;
       

        this.gunPositions = [];

    }

    addOnMove(onmove) {
        this.onmove = onmove;
    }

    move(direction, delta) {
        switch (direction) {
            case "forward":
                this.position.setX(this.position.getX() + this.speed / delta);
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

        if (this.onmove)
            this.onmove();

    }

    setManager(gameManager) {
        this.gameManager = gameManager;
    }

    setAudioManager(audioManager) {
        this.audioManager = audioManager;
    }

    setupManagers(gameManager, audioManager) {
        this.gameManager = gameManager;
        this.audioManager = audioManager;
    }

    getHealth() {
        return this.health;
    }

    hit(amout) {
 
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
        console.log("Died");
    }
    
    revive() {
        this.isAlive = true;
        this.health = 100;
    }
    

    shoot() {
       
        if (this.cooldown.activate()) {

            if (this.audioManager)
                this.audioManager.playEffect("shoot");
            
            
            for (let i = 0; i < this.gunPositions.length; i++){
                let gun = this.gunPositions[i];
                let pos = this.position;
                let calculated = { x: pos.getX() + gun.getX(), y: pos.getY() + gun.getY() };
                this.gameManager.spawnBullet("player", calculated);

                
            }
            
    
        }
            
    }

    activateAbility() {
        if (this.ability)
            this.ability();
    }

}

export class FireSpaceship extends SpaceshipBase {

    constructor() {
        let animation = new Animation2D(32, 32, 5, 0.3*16);
        super("/src/assets/sprites/spaceship-sprite.png", 80, animation, 220);
        this.type = "fire";
        this.speed = 40;
        this.firepower = 80;

        this.gunPositions.push(new Vector2D(80-40, 0));
        this.gunPositions.push(new Vector2D(80 - 40, 80 - 16));
        this.addAnimation("hit", new EffectAnimation("/src/assets/sprites/spaceship-sprite-hit.png"));

        this.ability = () => this.shootRockets();

        this.rocketTimer = new Timer(10000);

    }

    shootRockets() {

        if(this.rocketTimer.activate())
        for (let i = 0; i < this.gunPositions.length; i++) {
            let gun = this.gunPositions[i];
            let pos = this.position;
            let calculated = { x: pos.getX() + gun.getX(), y: pos.getY() + gun.getY()-5 };
            this.gameManager.spawnRocket(calculated);
        }

            
    }


}

export class SpeedSpaceship extends SpaceshipBase {

    constructor() {
        let animation = new Animation2D(32, 32, 5, 0.3*16);
        super("/src/assets/sprites/spaceship_speed-sprite.png", 80, animation, 300);
        this.type = "speed";
        
        this.speed = 70;
        this.firepower = 55;
        this.health = 125;

        this.gunPositions.push(new Vector2D(80, 80 / 2 - 8));
        this.addAnimation("hit", new EffectAnimation("/src/assets/sprites/spaceship_speed-sprite-hit.png"));
        this.laserTimer = new OnTimer(10000,5000);
      
        this.ability = () => this.shootLaser();
    }

    shootLaser() {
        if(this.laserTimer.activate())
        for (let i = 0; i < this.gunPositions.length; i++) {
            let gun = this.gunPositions[i];
            let pos = this.position;
            let calculated = { x: pos.getX() + gun.getX(), y: pos.getY() + gun.getY()+2 };
            this.gameManager.spawnLaser(calculated);
        }
    }


}