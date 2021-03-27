import { ImageWidget } from "../Controls/Image.js";
import { Text, TextWithShadow } from "../Controls/Text.js";
import { BaseScreen } from "./BaseScreen.js";
import { Button } from "../Controls/Button.js";

export class ScoreboardScreen extends BaseScreen{
    constructor(sceneManager) {
        super("scoreboard", "Scoreboard screen", "/src/assets/background/bg.svg");
        let titleText = new TextWithShadow("Scoreboard", "center", 120, "80pt", "arcade");

        let backBtnText = new Text("back", 70, "center", "13px");
        let backButton = new Button(20, 20, 120, 40, "/src/assets/ui/back-plain.png", backBtnText);

        let planetDecor = new ImageWidget("/src/assets/decors/earth.png", 140, 470, 130, 130);

        let marsDecor = new ImageWidget("/src/assets/decors/mars2.png", 700, 250, 200, 200);
        let marsDecorSmall = new ImageWidget("/src/assets/decors/mars1.png", 880, 290, 50, 50);

        backButton.addOnClick(() => {

            sceneManager.setScene("main-menu");
        });

        this.addSubject(backButton);
        
        let scoreBg = new ImageWidget("/src/assets/ui/score-bg.png","center", 160,900,500);

        this.widgets = [marsDecor,marsDecorSmall,titleText,scoreBg, backButton,planetDecor];
    }
}