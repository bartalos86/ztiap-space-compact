import { Button, TextButton, ToggleButton } from "../Controls/Button.js";
import { BaseScreen } from "./BaseScreen.js";
import { Text, TextWithShadow } from "../Controls/Text.js";

import { AnimatedImageWidget, ImageWidget } from "../Controls/Image.js";
import { SpeedSpaceship } from "../Models/Spaceship.js";
import { Vector2D } from "../BaseTypes/Vector.js";
import { Animation2D } from "../BaseTypes/Animation.js";

export class MainMenu extends BaseScreen {

    constructor(sceneManager) {
        super("main-menu","Main menu", "/src/assets/background/bg3.svg");

        let title = new TextWithShadow("Space compact", "center", 320, "60pt","arcade");
        let earthAnimation = new Animation2D(100, 100, 160, 0.25*16);
        let planet = new AnimatedImageWidget("/src/assets/decors/earth-sprite-2.png", "center", 50, 180, 180, earthAnimation);
        let shipAnimation = new Animation2D(32, 32, 5, 0.2*16);
        let spaceship = new AnimatedImageWidget("/src/assets/sprites/spaceship-sprite.png", 600, 270, 100, 100,shipAnimation, -30);
        let marsAnimation = new Animation2D(100, 100, 100, 0.2*16);
        let mars = new AnimatedImageWidget("/src/assets/decors/mars-sprite-2.png", 910, 305, 50, 50,marsAnimation);
        

        let playBtn = new TextButton("center", 380, 250, 75, "Play game");


        playBtn.addOnClick(() => {
            sceneManager.setScene("game");
        });


        let spaceCenter = new TextButton("center", 480, 250, 75, "Space center");
        spaceCenter.addOnClick(() => sceneManager.setScene("space-center"));

        let scoreBtn = new TextButton("center", 580, 250, 75, "Scoreboard");

        scoreBtn.addOnClick(() => sceneManager.setScene("scoreboard"));

        let controlsTxt = new Text("controls","center","center","13px")
        let controls = new TextButton(20, 660, 100, 40, controlsTxt);

        controls.addOnClick(() => {
            
            sceneManager.setScene("controls");
        });

        let musicOn = new ImageWidget("/src/assets/ui/music-on.png", "center", "center", 30, 30);
        let musicOff = new ImageWidget("/src/assets/ui/music-off.png", "center", "center", 30, 30);
        let musicBtn = new ToggleButton(1170, 670, 40, 40, musicOn, musicOff);

      /*  let soundOn = new ImageWidget("/src/assets/ui/sound-on.png", "center", "center", 30, 30);
        let soundOff = new ImageWidget("/src/assets/ui/sound-off.png", "center", "center", 30, 30);
        let soundBtn = new ToggleButton("right", 670, 40, 40, soundOn, soundOff);*/

        this.addSubject(spaceCenter);
        this.addSubject(scoreBtn);
        this.addSubject(playBtn);
        this.addSubject(controls);
        //this.addSubject(soundBtn);


        this.widgets = [planet,spaceship, title,mars, playBtn,spaceCenter, scoreBtn, controls];


    }

   /* notify(event) {

        for (let i = 0; i < this.subjects.length; i++) {
            let subject = this.subjects[i];

            if (event.type == 'mousemove') {

                if (event.data.x > subject.posX && event.data.x < subject.posX + subject.width &&
                    event.data.y > subject.posY && event.data.y < subject.posY + subject.height) {
                    subject.setMouseOver(true);
                }
                else
                    subject.setMouseOver(false);

            }
            if (event.type == 'click') {
                //console.log(`postion: ${event.data.x} rect: ${subject.posX} ${subject.posX + subject.width}`);


                if (event.data.x > subject.posX && event.data.x < subject.posX + subject.width &&
                    event.data.y > subject.posY && event.data.y < subject.posY + subject.height) {

                    subject.click();
                }
            }

        }



    }*/

}