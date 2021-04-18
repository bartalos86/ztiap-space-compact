export class Sprite{
    constructor(imagePath, width, height, animation = null) {
        this.imagePath = imagePath;
        this.width = width;
        this.height = height;

        let img = new Image(this.width, this.height);
        img.src = this.imagePath;
        this.drawable = img;

        this.animation = animation;
        this.opacity = 1;
    }

    setOpacity(opacity) {
        this.opacity = opacity;
    }

    getOpacity() {
        return this.opacity;
    }

    getAnimation() { return this.animation }

    setDrawable(imagePath) {
        let img = new Image(this.width, this.height);
        this.imagePath = imagePath;
        img.src = this.imagePath;
        this.drawable = img;
    }

    setAnimation(animation2D) {
        this.animation = animation2D;

        /*if(this.animation && this.animation.keepSize != 'undefined')
        if (animation2D.keepSize === false) {
            this.height = animation2D.spHeight;
            this.width = animation2D.spWidth;
            
        }*/
    }
    
    setRotation(rot) {
        this.rotation = rot;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    getDrawable() {
       /* if (!this.spriteLoaded)
            return new Promise((resolve) => {
                this.drawable.addEventListener('load', () => {this.spriteLoaded = true; resolve(this.drawable);  })
            });
        else*/
            return new Promise((resolve) => resolve(this.drawable));


       
    }
}