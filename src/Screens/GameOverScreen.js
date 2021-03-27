import { TextButton } from "../Controls/Button.js";
import { AnimatedImageWidget, ImageWidget } from "../Controls/Image.js";
import { Text, TextWithShadow } from "../Controls/Text.js";
import { BaseScreen } from "./BaseScreen.js";
import { Animation2D } from "../BaseTypes/Animation.js"

export class GameOverScreen extends BaseScreen {
    constructor(sceneManager) {
        super("game-over", "Game Over Screeen", "/src/assets/background/bg.svg");

        let gameText = new TextWithShadow("Game", "center", 200, "120pt", "arcade");
        let overText = new TextWithShadow("Over", "center", 330, "120pt", "arcade");

        let planetDecor = new ImageWidget("/src/assets/decors/earth.png", 200, 150, 170, 170);

        let marsAnimation = new Animation2D(100, 100, 100, 0.2);
        let marsDecor = new AnimatedImageWidget("/src/assets/decors/mars-sprite-2.png", 850, 70, 50, 50, marsAnimation);

        let shipAnimation = new Animation2D(32, 32, 5, 0.2);
        let spaceship = new AnimatedImageWidget("/src/assets/sprites/spaceship-sprite.png", 80, 500, 100, 100, shipAnimation, -60);



        let scoreText = new Text("Your score: 200", "center", 430, "20pt");

        let mainMenuBtn = new TextButton("center", 520, 250, 75, "Main menu");

        mainMenuBtn.addOnClick(() => sceneManager.setScene("main-menu"));

        this.addSubject(mainMenuBtn);
        this.widgets = [gameText, overText, planetDecor, marsDecor, scoreText, spaceship, mainMenuBtn];
    }
}