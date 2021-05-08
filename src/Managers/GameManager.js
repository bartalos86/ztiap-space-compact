import { Observer } from "../BaseTypes/Observer.js";
import { Timer } from "../BaseTypes/Timer.js";
import { Boss } from "../Models/Boss.js";
import { Bullet, Laser, Rocket } from "../Models/Bullet.js";
import { DefaultEnemy, StarEnemy, StrongEnemy } from "../Models/Enemy.js";
import { Planet } from "../Models/Planet.js";
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
        this.planets = [];

        this.progress = 0;
        this.score = 0;
        this.isGameInProgress = false;
        this.boss = null;

        // setInterval(() => { if (this.isGameInProgress) this.processGameTime(); }, 500);
        this.spawnTimer = new Timer(1000);

    }

    setGameScene(scene) {
        this.gameScene = scene;
    }

    processGameTime() {
        this.progress++;
        this.score += 2;
        this.updateScore();

        if (this.progress % 5 == 0 && !this.isBossFight)
            this.spawnEnemy("base");

        if (this.progress > 20 && !this.isBossFight) {
            if (this.progress % 5 == 0)
                this.spawnEnemy("strong");
        }

        if (this.progress > 50 && !this.isBossFight) {
            if (this.progress % 20 == 0)
                this.spawnEnemy("star");
        }

        if (this.progress % 45 == 0 && !this.isBossFight) {
            this.startBossFight();
        }

        if (Math.random() * 1000 < 50 && this.planets.length < 1) {

            this.spawnPlanet()
        }
    }

    startBossFight() {
        this.isBossFight = true;

        let boss = new Boss();
        boss.setupManagers(this, this.audioManager);
        this.boss = boss;
        this.gameScene.activateBossFight();
        this.enemies.push(boss);
    }

    endBossFight() {
        this.isBossFight = false;
        //this.removeEnemy(boss);

        this.boss = null;
    }

    spawnPlanet() {
        let size = Math.random() * 150 + 150;
        this.planets.push(new Planet(size));
    }

    spawnEnemy(type) {
        let enemy = new DefaultEnemy();

        switch (type) {
            case "base": enemy = new DefaultEnemy(); break;
            case "strong": enemy = new StrongEnemy(); break;
            case "star": enemy = new StarEnemy(); break;
        }

        enemy.setAgression(this.progress / 10);


        enemy.setupManagers(this, this.audioManager)
        this.enemies.push(enemy);
    }

    setSpaceship(shipId) {

        if (shipId == "speed") {
            this.player = new SpeedSpaceship();
        } else {
            this.player = new FireSpaceship();
        }

        this.player.addOnMove(() => this.gameScene.setHealthbarPosition(this.player.position));
        let abilityType = this.player instanceof SpeedSpaceship ? "laser" : "rocket";

        this.player.addOnStateChangeCallback((state) => {
            this.gameScene.setAbilityIndicator(state, abilityType);

        });
        //this.gameScene.setHealthbarPosition(this.player.position);

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

        if (keys["KeyZ"]) {
            this.player.activateAbility();
        }
    }

    updatePlanets(delta) {
        for (let i = 0; i < this.planets.length; i++) {
            let planet = this.planets[i];

            if (!planet.isAlive) {
                this.removePlanet(planet);

            }

            planet.move(delta);

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


            if (enemy.fireCooldown)
                if (enemy.fireCooldown.activate())
                    enemy.shoot();


            if (!enemy.getIsAlive())
                this.removeEnemy(enemy);

        }
    }

    checkCollisionsPlayer() {
        for (let i = 0; i < this.enemyBullets.length; i++) {
            let bullet = this.enemyBullets[i];
            let playerCollision = (this.player.position.getX() + this.player.width - 20 >= bullet.position.getX() && this.player.position.getX() < bullet.position.getX()) &&
                (this.player.position.getY() + this.player.height - 20 > bullet.position.getY() && this.player.position.getY() < bullet.position.getY());


            if (playerCollision) {

                this.player.hit(bullet.getDamage() * 2.5);
                this.updateLives();
                bullet.destroy();
                this.removeBullet(bullet);
            }
        }
    }

    checkCollisionsEnemy() {
        for (let i = 0; i < this.getEnemies().length; i++) {
            let enemy = this.getEnemies()[i];

            if (!enemy.hasCollision)
                continue;

            for (let i = 0; i < this.getBullets().length; i++) {
                let bullet = this.getBullets()[i];

                let hitbox = enemy.getHitbox();

                let isCollided = bullet.position.getX() + bullet.width > hitbox.xStart && bullet.position.getX() < hitbox.xStart + hitbox.width &&
                    bullet.position.getY() + bullet.height > hitbox.yStart && bullet.position.getY() < hitbox.yStart + hitbox.height;

                if (isCollided) {

                    if (bullet.type != "laser") {
                        bullet.destroy();
                        this.removeBullet(bullet);
                    }


                    enemy.hit(bullet.getDamage());
                }
            }

            if (!enemy.getIsAlive()) {
                this.score += enemy.getPoints() + 20;
                this.updateScore();
            }

            let playerCollision = (this.player.position.getX() + this.player.width - 20 >= enemy.position.getX() && this.player.position.getX() < enemy.position.getX() + enemy.width) &&
                (this.player.position.getY() + this.player.height - 20 > enemy.position.getY() && this.player.position.getY() < enemy.position.getY() + enemy.height);

            if (playerCollision) {
                this.player.hit(100);
                enemy.die();


                this.updateLives();
            }

        }
    }

    updateLives() {
        if (!this.player.isAlive) {
            this.gameScene.decreaseLife();
            this.player.revive();

        }
    }

    updateScore() {
        this.gameScene.setScore(this.score);
    }

    updateBossHealth() {
        this.gameScene.setBossHealth(this.boss);

        if (!this.boss.isAlive) {
            this.endBossFight();
            this.gameScene.deactivateBossFight();
        }
    }

    update(delta) {

        this.updateControls(delta)
        this.updateBullets(delta);
        this.updateEnemies(delta);
        this.checkCollisionsEnemy();
        this.checkCollisionsPlayer();
        this.updatePlanets(delta);

        if (this.isBossFight) {
            this.updateBossHealth();
        }

        if (this.isGameInProgress) {
            if (this.spawnTimer.activate())
                this.processGameTime();
        }

        this.gameScene.setHealth(this.player.getHealth());


      


    }

    startGame() {
        this.isGameInProgress = true;
        this.progress = 0;
        this.gameScene.resetLives();
        this.score = 0;
        let abilityType = this.player instanceof SpeedSpaceship ? "laser" : "rocket";
        this.gameScene.setAbilityIndicator(true, abilityType);

    }

    endGame() {
        this.bullets = [];
        this.enemyBullets = [];
        this.enemies = [];
        this.planets = [];
        this.isGameInProgress = false;

        if (this.isBossFight) {
            this.endBossFight();
            this.gameScene.deactivateBossFight();
        }

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

    getPlanets() {
        return this.planets;
    }

    removePlanet(planet) {
        let index = this.planets.indexOf(planet);


        if (this.planets.length <= 1)
            this.planets = [];
        else
            this.planets.splice(index, 1);


    }

    removeBullet(bullet) {
        let index = this.bullets.indexOf(bullet);

        if (index < 0) {
            index = this.enemyBullets.indexOf(bullet);

            if (index == -1)
                return;

            this.enemyBullets.splice(index, 1);

            if (this.enemyBullets.length <= 1)
                this.enemyBullets = [];

        } else {
            this.bullets.splice(index, 1);


            if (this.bullets.length < 1)
                this.bullets = [];

        }

    }

    removeEnemy(enemy) {
        let index = this.enemies.indexOf(enemy);

        if (this.enemies.length <= 1)
            this.enemies = [];
        else
            this.enemies.splice(index, 1);


    }

    spawnBullet(owner, position) {
        if (owner == "player") {
            this.bullets.push(new Bullet(position.x, position.y, owner));

        } else if (owner == "boss") {
            this.enemyBullets.push(new Bullet(position.x, position.y, owner, 45, 25, 1.7));

        }
        else {

            this.enemyBullets.push(new Bullet(position.x, position.y, owner));

        }
    }

    spawnRocket(position) {
        this.bullets.push(new Rocket(position.x, position.y));
    }

    spawnLaser(position) {

        if (this.prevLaser)
            this.removeBullet(this.prevLaser);

        let laser = new Laser(position.x, position.y);
        this.prevLaser = laser;
        this.bullets.push(laser);
    }

    notify(event) {

    }

}