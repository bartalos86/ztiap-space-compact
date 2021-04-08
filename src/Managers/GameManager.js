import { Observer } from "../BaseTypes/Observer.js";
import { Timer } from "../BaseTypes/Timer.js";
import { Bullet } from "../Models/Bullet.js";
import { DefaultEnemy, StarEnemy, StrongEnemy } from "../Models/Enemy.js";
import { FireSpaceship, SpeedSpaceship } from "../Models/Spaceship.js";

export class GameManager extends Observer {

    constructor(audioManager, controller, sceneManager) {
        super();
        this.audioManager = audioManager;
        this.controller = controller;
        this.setSpaceship("fire");
        this.bullets = [];
        this.enemyBullets = [];
        this.enemies = [];

        this.progress = 0;
        this.isGameInProgress = false;

       // setInterval(() => { if (this.isGameInProgress) this.processGameTime(); }, 500);
        this.spawnTimer = new Timer(1000);

    }

    processGameTime() {
        this.progress++;

        if (this.progress % 5 == 0)
            this.spawnEnemy("base");

        if (this.progress > 20) {
            if (this.progress % 10 == 0)
                this.spawnEnemy("strong");
        }

        if (this.progress > 30) {
            if (this.progress % 20 == 0)
                this.spawnEnemy("star");
        }
    }

    spawnEnemy(type) {
        let enemy = new DefaultEnemy();

        switch (type) {
            case "base": enemy = new DefaultEnemy(); break;
            case "strong": enemy = new StrongEnemy(); break;
            case "star": enemy = new StarEnemy(); break;
        }

        console.log("enemy spawned");
        enemy.setupManagers(this, this.audioManager)
        this.enemies.push(enemy);
    }

    setSpaceship(shipId) {

        if (shipId == "speed") {
            this.player = new SpeedSpaceship();
        } else {
            this.player = new FireSpaceship();
        }

        this.player.setupManagers(this, this.audioManager);

    }

    updateControls(delta) {
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

    updateBullets(delta) {
        for (let i = 0; i < this.getBullets().length; i++) {
            let bullet = this.getBullets()[i];
            bullet.move(delta);

            if (!bullet.getIsAlive()) {
                this.removeBullet(bullet);
            }
        }

        for (let i = 0; i < this.enemyBullets.length; i++) {
            let bullet = this.enemyBullets[i];
            bullet.move(delta);

            if (!bullet.getIsAlive()) {
                this.removeBullet(bullet);
            }
        }
    }

    updateEnemies(delta) {
        for (let i = 0; i < this.getEnemies().length; i++) {
            let enemy = this.getEnemies()[i];
            enemy.move(delta);

           //TODO: Ezt rendesen megcsinalni
                if (Math.random() * 100 > 50)
                    enemy.shoot();

         

            if (!enemy.getIsAlive())
                this.removeEnemy(enemy);

        }
    }

    checkCollisionsEnemy() {
        for (let i = 0; i < this.getEnemies().length; i++) {
            let enemy = this.getEnemies()[i];

            for (let i = 0; i < this.getBullets().length; i++) {
                let bullet = this.getBullets()[i];
               
                if (bullet.position.getX() > enemy.position.getX() && bullet.position.getX() < enemy.position.getX() + enemy.width &&
                    bullet.position.getY() > enemy.position.getY() && bullet.position.getY() < enemy.position.getY() + enemy.height) {
                    bullet.destroy();
                    enemy.hit(bullet.getDamage());
                }
            }
        }
    }

    update(delta) {

        this.updateControls(delta)
        this.updateBullets(delta);
        this.updateEnemies(delta);
        this.checkCollisionsEnemy();

        if (this.isGameInProgress) {
            if (this.spawnTimer.activate())
                this.processGameTime();
        }


    }

    startGame() {
        this.isGameInProgress = true;
        this.progress = 0;
        console.log("game started");
    }

    endGame() {
        this.bullets = [];
        this.enemyBullets = [];
        this.enemies = [];
        this.isGameInProgress = false;
    }

    getPlayer() {
        return this.player;
    }

    getBullets() {
        return this.bullets;
    }

    getEnemyBullets() {
        return this.enemyBullets;
    }

    getEnemies() {
        return this.enemies;
    }

    removeBullet(bullet) {
        let index = this.bullets.indexOf(bullet);

        if (index == -1) {
            index = this.enemyBullets.indexOf(bullet);
            this.enemyBullets.splice(index, 1);

            if (this.enemyBullets.length <= 1)
                this.enemyBullets = [];

        } else {
            this.bullets.splice(index, 1);

            if (this.bullets.length <= 1)
                this.bullets = [];

        }

        console.log("bullet count: " + index);
    }

    removeEnemy(enemy) {
        let index = this.enemies.indexOf(enemy);

        this.enemies.splice(index, 1);

            if (this.enemies.length <= 1)
                this.enemies = [];
        
    }

    spawnBullet(owner, position) {
        if (owner == "player") {
            this.bullets.push(new Bullet(position.x, position.y, owner));
        } else {
            console.log("enemy bullet spawned")
            this.enemyBullets.push(new Bullet(position.x, position.y, owner));

        }
    }

    notify(event) {

    }

}