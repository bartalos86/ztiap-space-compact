import { Observer } from "../BaseTypes/Observer.js";
import { Bullet } from "../Models/Bullet.js";
import { FireSpaceship, SpeedSpaceship } from "../Models/Spaceship.js";

export class GameManager extends Observer {

    constructor(audioManager) {
        super();
        this.audioManager = audioManager;
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

        if (event.type == "keydown") {
            let key = event.data.key;

            //  console.log(event.data);

            switch (key) {

                case "w": this.player.move("up", 1);
                    break;
                case "s": this.player.move("down", 1);
                    break;
                case "a": this.player.move("backward", 1);
                    break;
                case "d": this.player.move("forward", 1);
                    break;

            }

            if (event.data.code == "Space") {
                this.player.shoot();
            }
        }
    }

}