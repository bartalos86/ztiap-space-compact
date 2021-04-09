import { Button, ToggleButton } from "../Controls/Button.js";
import { HealthWidget } from "../Controls/Health.js";
import { ImageWidget } from "../Controls/Image.js";
import { DefaultProgressbar, Progressbar } from "../Controls/ProgressBar.js";
import { Text } from "../Controls/Text.js";
import { BaseScreen } from "./BaseScreen.js";

export class GameScreen extends BaseScreen {
    constructor(sceneManager) {
        super("game", "Main menu", "");

        this.sceneManager = sceneManager;

        let btnText = new Text("back", 70, "center", "13px");
        let backButton = new Button(20, 700 - 40, 120, 40, "/src/assets/ui/back-plain.png", btnText);

        let hudBg = new ImageWidget("/src/assets/ui/game-hud-bg.png", "center", -2, 1300, 79);

        let playerNameText = new Text("player1", 120, 55, "35pt", "arcade");
        let scoreText = new Text("Score: 100", 1100, 55, "35pt", "arcade");

        this.healthWidget = new HealthWidget(200, "bottom", 46, 40);
       
        this.healthBar = new Progressbar("/src/assets/ui/progress-fg-gr-tr.png", "/src/assets/ui/progress-bg-tr.png", "center", 0, 60, 4);

        this.addOnActivated(() => {
            //  let name = prompt("Name: ");
            // playerNameText.text = name;

            sceneManager.getAudioManager().playMusic("background-1");
            sceneManager.getGameManager().startGame();
        });
        this.addOnDeactivated(() => { sceneManager.getAudioManager().stopMusic(); sceneManager.getGameManager().endGame(); });
        backButton.addOnClick(() => {

            this.decreaseLife();

        });

        this.addSubject(backButton);

        this.widgets = [hudBg, playerNameText, scoreText, backButton, this.healthWidget, this.healthBar];
    }

    setHealth(health) {
        this.healthBar.setPercentage(health)
    }

    setHealthbarPosition(position) {
        this.healthBar.setPosition(position.getX()+8,position.getY()-10);
    }

    resetLives() {
        this.healthWidget.setHealth(3);
    }

    decreaseLife() {
        this.healthWidget.setHealth(this.healthWidget.getCurrentHealth() - 1);

        if (this.healthWidget.getCurrentHealth() <= 0)
            this.sceneManager.setScene("game-over");

        return this.healthWidget.getCurrentHealth();
    }


}