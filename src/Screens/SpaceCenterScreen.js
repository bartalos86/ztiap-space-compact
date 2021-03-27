import { BaseScreen } from "./BaseScreen.js";
import { Button, ImageButton } from "../Controls/Button.js";
import { Text, TextWithShadow } from "../Controls/Text.js";
import { AnimatedImageWidget, ImageWidget } from "../Controls/Image.js";
import { Animation2D } from "../BaseTypes/Animation.js";
import { TextShadow } from "../BaseTypes/TextShadow.js";
import { DefaultProgressbar } from "../Controls/ProgressBar.js";

export class SpaceCenterScreen extends BaseScreen{
    constructor(sceneManager) {
        super("space-center", "Space center", "/src/assets/background/bg.svg");

        let titleText = new TextWithShadow("Space Center", "center", 100, "60pt", "arcade");

        let backBtnText = new Text("back", 70, "center", "13px");
        let backButton = new Button(20, 20, 120, 40, "/src/assets/ui/back-plain.png", backBtnText);

        let shipAnimation = new Animation2D(32, 32, 5, 0.2);
        let spaceship = new AnimatedImageWidget("/src/assets/sprites/spaceship-sprite.png", "center", 140, 200, 200, shipAnimation);

        backButton.addOnClick(() => sceneManager.setScene("main-menu"));
        this.addSubject(backButton);

        let leftArrowBtn = new Button(100, 180,100, 100, "", new ImageWidget("/src/assets/ui/arrow.png", "center", "center", 100, 100));
        let rightArrowBtn = new Button(1080, 180, 100, 100,  "", new ImageWidget("/src/assets/ui/arrow-1.png", "center", "center", 100, 100));

        let textShadow = new TextShadow(1, 3, "black");
        let firepowerText = new Text("Firepower:", 300, 470, "15pt", "pixel", "#FEAE34", textShadow);
        let speedText = new Text("Speed:", 275, 530, "15pt", "pixel", "#FEAE34", textShadow);
        let specialText = new Text("Special ability:", 315, 590, "15pt", "pixel", "#FEAE34", textShadow);

        let firepowerProgress = new DefaultProgressbar(600, 450, 340, 15);
        let speedProgress = new DefaultProgressbar(600, 515, 340, 15);

        let specialIcon = new ImageWidget("/src/assets/sprites/rocket.png",600,565,72,36);

        firepowerProgress.setPercentage(70);
        speedProgress.setPercentage(50);
        //let speProgress = new DefaultProgressbar(650, 460, 270, 13);

        let scoreBg = new ImageWidget("/src/assets/ui/score-bg.png","center", 350,1000,350);

        this.widgets = [scoreBg,backButton, leftArrowBtn, rightArrowBtn, titleText,speedText,specialText,spaceship, firepowerText,firepowerProgress, speedProgress, specialIcon];
    }
}