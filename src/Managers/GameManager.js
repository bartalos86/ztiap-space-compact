import { Observer } from "../BaseTypes/Observer.js";
import { Bullet } from "../Models/Bullet.js";
import { FireSpaceship, SpeedSpaceship } from "../Models/Spaceship.js";

export class GameManager extends Observer {

    constructor(audioManager, controller) {
        super();
        this.audioManager = audioManager;
        this.controller = controller;
        this.setSpaceship("fire");
        this.bullets = [];
        this.enemyBullets = [];

        
    }

    setSpaceship(shipId) {

        if (shipId == "speed") {
            this.player = new SpeedSpaceship();
        } else {
            this.player = new FireSpaceship();
        }

        this.player.setupManagers(this, this.audioManager);

    }

    update(delta) {

        let keys = this.controller.getKeys();

        if (keys["KeyW"]) {
            this.player.move("up", delta);
        }

        if (keys["KeyS"]) {
            this.player.move("down", delta);
        }

        if (keys["KeyA"]) {
            this.player.move("backward", delta);
        }

        if (keys["KeyD"]) {
            this.player.move("forward", delta);
        }

        if (keys["Space"]) {
            this.player.shoot();
       }
    }

    startGame() {

    }

    endGame() {
        this.bullets = [];
        this.enemyBullets = [];
    }

    getPlayer() {
        return this.player;
    }

    getBullets() {
        return this.bullets;
    }

    removeBullet(bullet) {
        let index = this.bullets.indexOf(bullet);

        if (!index) {
            index = this.enemyBullets.indexOf(bullet);
            this.enemyBullets.splice(index, 1);

            if (this.enemyBullets.length <= 1)
                this.enemyBullets = [];

        } else {
            this.bullets.splice(index, 1);

            if (this.bullets.length <= 1)
                this.bullets = [];

        }

        console.log("bullet count: " + this.bullets.length);
    }

    spawnBullet(owner, position) {
        if (owner == "player") {
            this.bullets.push(new Bullet(position.x, position.y, owner));
        }
    }

    notify(event) {

    }

}