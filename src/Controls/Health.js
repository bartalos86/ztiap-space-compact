import { Widget } from "./Widget.js";

export class HealthWidget extends Widget{
    constructor(posX, posY, oneWidth, oneHeight, maxHealth = 3, margin = 7) {
        let width = maxHealth * oneWidth + maxHealth * margin*2;
        
        super(posX, posY,width,oneHeight, "health");
        this.maxHealth = maxHealth;
        this.height = oneHeight;
        this.elementWidth = oneWidth;
        let image = new Image();
        image.src = "/src/assets/sprites/hearth-crop.png";
        this.drawable = image;
        this.margin = oneWidth + margin;
        this.currentHealth = maxHealth;


    }

    getDrawable() {
        return this.drawable;
    }

    setHealth(health) {
        this.currentHealth = health;
        this.width = this.currentHealth * this.elementWidth + this.currentHealth * this.margin*2;
    }

    getCurrentHealth() {
        return this.currentHealth;
    }

    getSingleSize() {
        return this.elementWidth;
    }

    getMargin() {
        return this.margin;
    }
}