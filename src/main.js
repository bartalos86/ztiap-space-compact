import { AudioManager } from "./Managers/AudioManager.js";
import { Controller } from "./Controller.js";
import { Display } from "./Display.js";
import { GameManager } from "./Managers/GameManager.js";
import { SceneManager } from "./Managers/SceneManager.js";

window.onload = () => {
    let display = new Display("canvas");
    let audio = new AudioManager();
    //audio.playEffect("shoot");
    //audio.playMusic("background-2");

    /* let spaceship = new FireSpaceship();
     spaceship.position.setPosition(100, 100);*/

    // let enemies = [new StartEnemy(), new StartEnemy(), new DefaultEnemy(), new StrongEnemy()];
    let controller = new Controller(display.getCanvas());
    let gameManager = new GameManager(audio, controller);

    let sceneManager = new SceneManager(controller, audio, gameManager);
    gameManager.setGameScene(sceneManager.getScene("game"));

    controller.addSubject(gameManager);

    //Loop for the GUI
    async function menuLoop() {


        await display.drawScreen(sceneManager.getCurrentScene());
        await display.drawScreen(sceneManager.getGlobalScene());

        window.requestAnimationFrame(menuLoop);
    }



    //Main game loop
    async function gameLoop(timestamp) {
        var delta = timestamp - lastRender;
        // await display.clear();

        if (delta == 'undefined')
            delta = 1;

        display.setDelta(delta);

        if (sceneManager.getCurrentSceneId() == "game") {

            await display.renderBackground(-timestamp / 5);
            gameManager.update(delta);

            for (let i = 0; i < gameManager.getPlanets().length; i++){
                let planet = gameManager.getPlanets()[i];
                await display.drawSprite(planet);
            }
            

            for (let i = 0; i < gameManager.getBullets().length; i++) {
                let bullet = gameManager.getBullets()[i];
                await display.drawSprite(bullet);
            }

            for (let i = 0; i < gameManager.getEnemies().length; i++) {
                let enemy = gameManager.getEnemies()[i];
                // enemy.move(delta);
                await display.drawSprite(enemy);
            }

            for (let i = 0; i < gameManager.getEnemyBullets().length; i++) {
                let bullet = gameManager.getEnemyBullets()[i];
                await display.drawSprite(bullet);
            }

          

            

            await display.drawSprite(gameManager.getPlayer());


        }



        lastRender = timestamp;
        window.requestAnimationFrame(gameLoop);
    }

    var lastRender = 0;
    window.requestAnimationFrame(gameLoop);
    window.requestAnimationFrame(menuLoop);




};
