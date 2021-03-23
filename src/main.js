import { MainMenu } from "./Screens/MainMenu.js";
import { Controller } from "./Controller.js";
import { Display } from "./Display.js";
import { StartEnemy, DefaultEnemy, StrongEnemy } from "./Models/Enemy.js";
import { FireSpaceship, SpeedSpaceship } from "./Models/Spaceship.js";

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
    let scene = "menu";
    function setScene(localScene) {
        scene = localScene;
    }

    let mainMenu = new MainMenu({setScene},controller);
    controller.addSubject(mainMenu);

    async function loop(timestamp) {
        var delta = timestamp - lastRender;

        if (delta == 'undefined')
            delta = 1;
           
      
        //display.clear();
        if (scene == "menu") {
        await display.drawScreen(mainMenu);
              //console.log(scene);
        }
        else {
            await display.renderBackground(-timestamp / 5);

            for (let i = 0; i < enemies.length; i++) {
                enemies[i].move(delta);
                await display.drawSprite(enemies[i]);
            }

            await display.drawSprite(spaceship, delta);
        }



        //console.log(delta);



        lastRender = timestamp;
        window.requestAnimationFrame(loop);
    }

    var lastRender = 0;
    window.requestAnimationFrame(loop);




};
