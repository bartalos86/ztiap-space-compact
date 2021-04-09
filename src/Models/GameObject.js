import { Sprite } from "./Sprite.js ";

export class GameObject extends Sprite{

    constructor(sprite, width, height, animation = null) {
        super(sprite, width, height, animation);

        this.originalImagePath = sprite;
        this.originalAnimation = animation;
        this.animations = [];
    }

    addAnimation(key, effectAnimation) {
        this.animations[key] = () => {
            this.setDrawable(effectAnimation.imagePath);
            if (effectAnimation.getAnimation2D())
                this.setAnimation(effectAnimation.getAnimation2D());

            setTimeout(() => {
                this.setDrawable(this.originalImagePath)
                if (effectAnimation.getAnimation2D())
                    this.setAnimation(effectAnimation.originalAnimation);
                
            }, effectAnimation.timeout)
        }
    }

    playAnimation(key) {
        if(this.animations[key])
        this.animations[key]();
    }
}