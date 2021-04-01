import { Controller } from "./Controller.js";
import { Display } from "./Display.js";
import { StartEnemy, DefaultEnemy, StrongEnemy } from "./Models/Enemy.js";
import { FireSpaceship } from "./Models/Spaceship.js";
import { SceneManager } from "./SceneManager.js";

window.onload = () => {
    let display = new Display("canvas");

    let spaceship = new FireSpaceship();
    spaceship.position.setPosition(100, 100);

    let enemies = [new StartEnemy(), new StartEnemy(), new DefaultEnemy(), new StrongEnemy()];

    let controller = new Controller(display.getCanvas());

    window.onkeydown = (event) => {

        console.log(event.key);
        let key = event.key;
        switch (key) {

            case "w": spaceship.move("up", 1);
                break;
            case "s": spaceship.move("down", 1);
                break;
            case "a": spaceship.move("backward", 1);
                break;
            case "d": spaceship.move("forward", 1);
                break;

        }

    }

    let sceneManager = new SceneManager(controller);

    //Loop for the GUI
    async function menuLoop() {
        await display.drawScreen(sceneManager.getCurrentScene());
        await display.drawScreen(sceneManager.getGlobalScene());

        window.requestAnimationFrame(menuLoop);
    }

    

    //Main game loop
    async function loop(timestamp) {
        var delta = timestamp - lastRender;

        if (delta == 'undefined')
            delta = 1;
        
        display.setDelta(delta);

        if (sceneManager.getCurrentSceneId() == "game") {

            await display.renderBackground(-timestamp / 5);

            for (let i = 0; i < enemies.length; i++) {
                enemies[i].move(delta);
                await display.drawSprite(enemies[i]);
            }

            await display.drawSprite(spaceship, delta);
        }

        lastRender = timestamp;

        window.requestAnimationFrame(loop);
    }

    var lastRender = 0;
    window.requestAnimationFrame(loop);
    window.requestAnimationFrame(menuLoop);




};
