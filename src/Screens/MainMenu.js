import { Button } from "../Controls/Button.js";
import { BaseScreen } from "./BaseScreen.js";
import { Text } from "../Controls/Text.js";

export class MainMenu extends BaseScreen {

    constructor(game) {
        super("Main menu", "/src/assets/background/bg.svg");

        let title = new Text("Space compact","center", 140, "60pt");

        let playBtn = new Button("center", 250, 250, 75, "/src/assets/ui/button.png", "Play game");

        this.addSubject(playBtn);

        playBtn.addOnClick(() => {
            game.setScene("play");
        });



        let scoreBtn = new Button("center", 350, 250, 75, "/src/assets/ui/button.png", "Scoreboard");
        this.widgets = [title ,playBtn, scoreBtn];

        //this.addSubject(scoreBtn);

    }

    notify(event) {

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
                console.log(`postion: ${event.data.x} rect: ${subject.posX} ${subject.posX + subject.width}`);


                if (event.data.x > subject.posX && event.data.x < subject.posX + subject.width &&
                    event.data.y > subject.posY && event.data.y < subject.posY + subject.height) {

                    subject.click();
                }
            }

        }



    }

}