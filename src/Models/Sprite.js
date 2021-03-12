export class Sprite{
    constructor(imagePath, width, height) {
        this.imagePath = imagePath;
        this.width = width;
        this.height = height;

        let img = new Image(this.width, this.height);
        img.src = this.imagePath;
        this.drawable = img;
       
    }

    setRotation(rot) {
        this.rotation = rot;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    getDrawable() {
        if (!this.spriteLoaded)
            return new Promise((resolve) => {
                this.drawable.addEventListener('load', () => { resolve(this.drawable); this.spriteLoaded = true; })
            });
        else
            return new Promise((resolve) => resolve(this.drawable));


       
    }
}