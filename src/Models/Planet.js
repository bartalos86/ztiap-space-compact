import { Vector2D } from "../BaseTypes/Vector.js";
import { Sprite } from "./Sprite.js";

export class Planet extends Sprite {

    constructor(size, type = null) {

        if (type == null) {
            let types = ["earth-less", "gas", "ice", "lava", "water", "saturn"];
            let selected = types[Math.floor(Math.random() * types.length)];
            super(`/src/assets/decors/${selected}.png`,size, size);
        } else {
            super(`/src/assets/decors/${type}.png`,size, size);
        }

    
        this.isAlive = true;
        
        let relPos = Math.random() > 0.5;


        let y = Math.random() * 100 - size/3;

        if (relPos == 1) {
            y = 720 - y - size;
        }



        this.position = new Vector2D(1280, y);
        this.speed = (300- size) / 6;

        this.setOpacity(1);
    }

    move(delta) {
        this.position.setX(this.position.getX() - (this.speed / delta));
    }

    destroy() {
        this.isAlive = false;
    }



}