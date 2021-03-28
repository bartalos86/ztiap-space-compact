import { Button,ToggleButton } from "../Controls/Button.js";
import { HealthWidget } from "../Controls/Health.js";
import { ImageWidget } from "../Controls/Image.js";
import { Text } from "../Controls/Text.js";
import { BaseScreen } from "./BaseScreen.js";

export class GameScreen extends BaseScreen{
    constructor(sceneManager) {
        super("game","Main menu", "");
        let btnText = new Text("back", 70, "center", "13px");
        let backButton = new Button(20, 700-40, 120, 40, "/src/assets/ui/back-plain.png", btnText);

        let hudBg = new ImageWidget("/src/assets/ui/game-hud-bg.png", "center", -2, 1300, 79);

        let playerNameText = new Text("player1", 120, 55, "35pt", "arcade");
        let scoreText = new Text("Score: 100", 1100, 55, "35pt", "arcade");

        let healthWidget = new HealthWidget("center", 20, 46,40);

 
        
        backButton.addOnClick(() => {

            if(healthWidget.getCurrentHealth() <= 0)
                sceneManager.setScene("main-menu");
            else
            healthWidget.setHealth(healthWidget.getCurrentHealth() - 1);
                
        });

        this.addSubject(backButton);

        this.widgets = [hudBg,playerNameText,scoreText,backButton, healthWidget];
    }
    
    
 }