import { Display } from "./Display.js";
import { Enemy } from "./Models/Enemy.js";
import { Spaceship } from "./Models/Spaceship.js";

window.onload = () => {
    let display = new Display("canvas");

    let spaceship = new Spaceship();
    spaceship.position.setPosition(100, 100);
    let speed = 10;

    let enemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

    window.onkeydown = (event) => {

        console.log(event.key);
        let key = event.key;
        switch (key) {

            case "w": spaceship.position.setY(spaceship.position.getY() - speed);
                break;
            case "s": spaceship.position.setY(spaceship.position.getY() + speed);
                break;
            case "a": spaceship.position.setX(spaceship.position.getX() - speed);
                break;
            case "d": spaceship.position.setX(spaceship.position.getX() + speed);
                break;

        }


    }

    async function loop(timestamp) {
        var delta = timestamp - lastRender;

        if (delta == 'undefined')
            delta = 1;
      
        
           
        
          await display.renderBackground(-timestamp / 5);

        for (let i = 0; i < enemies.length; i++) {
            enemies[i].move(delta);
           await display.drawSprite(enemies[i], delta);
        }

         await display.drawSprite(spaceship, delta);
        
        //console.log(delta);



        lastRender = timestamp;
        window.requestAnimationFrame(loop);
    }

    var lastRender = 0;
    window.requestAnimationFrame(loop);




};
