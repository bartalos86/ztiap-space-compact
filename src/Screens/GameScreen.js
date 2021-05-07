import { Animation2D } from "../BaseTypes/Animation.js";
import { Button, ToggleButton } from "../Controls/Button.js";
import { HealthWidget } from "../Controls/Health.js";
import { AnimatedImageWidget, ImageWidget } from "../Controls/Image.js";
import { DefaultProgressbar, Progressbar } from "../Controls/ProgressBar.js";
import { Text, TextWithShadow } from "../Controls/Text.js";
import { BaseScreen } from "./BaseScreen.js";

export class GameScreen extends BaseScreen {
    constructor(sceneManager) {
        super("game", "Main menu", "");

        this.sceneManager = sceneManager;

        let btnText = new Text("back", 70, "center", "13px");
        let backButton = new Button(20, 700 - 40, 120, 40, "/src/assets/ui/back-plain.png", btnText);

        let hudBg = new ImageWidget("/src/assets/ui/game-hud-bg.png", "center", -2, 1300, 79);

        let playerNameText = new Text("player1", 120, 55, "35pt", "arcade");
        this.scoreText = new Text("Score: 100", 1100, 55, "35pt", "arcade");

        this.healthWidget = new HealthWidget(35, 20, 46, 40);
       
        this.healthBar = new Progressbar("/src/assets/ui/progress-fg-gr-tr.png", "/src/assets/ui/progress-bg-tr.png", "center", -50, 60, 4);
        this.bossHealthBar = new Progressbar("/src/assets/ui/boss-bar.png", "/src/assets/ui/progress-bg-tr.png", "center", 670, 800, 20);
        this.bossName = new Text("Ultimate  mega  destroyer  boss", "center", 655, "23pt", "pixel");

        let explosion = new AnimatedImageWidget("/src/assets/sprites/explosion.png", 100, 100, 100, 100, new Animation2D(100, 100, 10, 0.3*16, 6));

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

        this.widgets = [hudBg, this.scoreText, this.healthWidget, this.healthBar];
    }

    setScore(score) {
        score = Math.round(score);
        this.scoreText.setText(`Score: ${score}`);
    }

    activateBossFight() {
        this.widgets.push(this.bossHealthBar);
        this.widgets.push(this.bossName);
    }

    deactivateBossFight() {
        this.widgets.splice(this.widgets.indexOf(this.bossHealthBar),1);
        this.widgets.splice(this.widgets.indexOf(this.bossName),1);
    }

    setBossHealth(boss) {
        this.bossHealthBar.setPercentage((boss.getHealth() / boss.getMaxHealth()) * 100);
        console.log("health: " + (boss.getHealth() / boss.getMaxHealth()) * 100);
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

        if (this.healthWidget.getCurrentHealth() <= 0) {
            let gameOverScene = this.sceneManager.getScene("game-over");
            let gameManager = this.sceneManager.getGameManager();
            gameOverScene.setScore(gameManager.score);
            gameOverScene.setSpaceship(gameManager.player.type);
            this.sceneManager.setScene("game-over");
        }

        return this.healthWidget.getCurrentHealth();
    }


}