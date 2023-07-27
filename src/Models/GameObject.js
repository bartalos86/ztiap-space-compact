import { Sprite } from "./Sprite.js ";

export class GameObject extends Sprite{

    constructor(sprite, width, height, animation = null) {
        super(sprite, width, height, animation);

        this.originalImagePath = sprite;
        this.originalAnimation = animation;
        this.animations = [];
        this.animationCompleted = [];
        this.animationStarted = [];
        this.originalWidth = width;
        this.originalHeight = height;

        this.hasCollision = true;
    }

    addOnAnimationCompleted(animationKey, func) {
        this.animationCompleted[animationKey] = func;
    }

    addOnAnimationStarted(animationKey, func) {
        this.animationStarted[animationKey] = func;
    }

    addAnimation(key, effectAnimation) {
        this.animations[key] = () => {
            this.setDrawable(effectAnimation.imagePath);
            if (effectAnimation.getAnimation2D())
                this.setAnimation(effectAnimation.getAnimation2D());
            
            this.animationInProgress = true;

            if (this.animationStarted[key])
                this.animationStarted[key]();
            
            let posOffset = effectAnimation.getOffset();
            if (posOffset) {
                this.position.setX(this.position.getX() + posOffset.getX());
                this.position.setY(this.position.getY() + posOffset.getY());
            }

            setTimeout(() => {
                this.setDrawable(this.originalImagePath)
                if (effectAnimation.getAnimation2D())
                    this.setAnimation(effectAnimation.originalAnimation);
                this.animationInProgress = false;

                if (posOffset) {
                    this.position.setX(this.position.getX() - posOffset.getX());
                    this.position.setY(this.position.getY() - posOffset.getY());
                }

                if (this.animationCompleted[key])
                    this.animationCompleted[key]();
                
                

            }, effectAnimation.timeout)
        }
    }

    playAnimation(key) {
        if(this.animations[key] && !this.animationInProgress)
        this.animations[key]();
    }
}