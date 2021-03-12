import { Display } from "./Display.js";
import { Spaceship } from "./Models/Spaceship.js";

window.onload = () => {
    let display = new Display("canvas");

    let spaceship = new Spaceship();
    spaceship.position.setPosition(100, 100);
    let speed = 10;

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
         display.renderBackground(-timestamp/5);
         display.drawSprite(spaceship, delta);

        lastRender = timestamp;
        window.requestAnimationFrame(loop);
    }

    var lastRender = 0
    window.requestAnimationFrame(loop)




};
