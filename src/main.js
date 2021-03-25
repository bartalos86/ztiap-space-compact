import { MainMenu } from "./Screens/MainMenu.js";
import { Controller } from "./Controller.js";
import { Display } from "./Display.js";
import { StartEnemy, DefaultEnemy, StrongEnemy } from "./Models/Enemy.js";
import { FireSpaceship, SpeedSpaceship } from "./Models/Spaceship.js";
import { GameScreen } from "./Screens/GameScreen.js";
import { ImageWidget } from "./Controls/Image.js";
import { ToggleButton } from "./Controls/Button.js";
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


    /*let scene = "menu";
    function setScene(localScene) {
        scene = localScene;
        display.clear();

        if (scene == "menu") {
            gameScreen.deactivate();
            mainMenu.activate();
        } else if() {
            mainMenu.deactivate();
            gameScreen.activate();
        }

    }*/



    /*let mainMenu = new MainMenu({ setScene }, controller);
    
    let gameScreen = new GameScreen({ setScene });
    gameScreen.addSubject(musicBtn);
    gameScreen.addSubject(soundBtn);

    gameScreen.addWidget(musicBtn);
    gameScreen.addWidget(soundBtn);

    controller.addSubject(mainMenu);
    controller.addSubject(gameScreen);*/

    //mainMenu.activate();

    async function loop(timestamp) {
        var delta = timestamp - lastRender;

        if (delta == 'undefined')
            delta = 1;



        //gameScreen.deactivate();

        //display.clear();
        

        //console.log(scene);

        if (sceneManager.getCurrentSceneId() == "game") {


            await display.renderBackground(-timestamp / 5);

            //await display.drawScreen(gameScreen);



            for (let i = 0; i < enemies.length; i++) {
                enemies[i].move(delta);
                await display.drawSprite(enemies[i]);
            }

            await display.drawSprite(spaceship, delta);
        }


        await display.drawScreen(sceneManager.getCurrentScene());

        await display.drawScreen(sceneManager.getGlobalScene());
        //console.log(delta);



        lastRender = timestamp;
        window.requestAnimationFrame(loop);
    }

    var lastRender = 0;
    window.requestAnimationFrame(loop);




};
