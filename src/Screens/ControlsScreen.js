import { ImageWidget } from "../Controls/Image.js";
import { BaseScreen } from "./BaseScreen.js";
import { Button,ToggleButton } from "../Controls/Button.js";
import { Text } from "../Controls/Text.js";

export class ControlsScreen extends BaseScreen{
    constructor(sceneManager) {
        super("controls","Controls screen", "/src/assets/background/bg.svg");
        let wasd = new ImageWidget("/src/assets/ui/wasd.png", 150, 250, 243.1, 162.5);
        let spacez = new ImageWidget("/src/assets/ui/spacez.png", 150, 430, 239.2, 91);

        let wasdText = new Text("controlling the spaceship", 770, 330, "37pt", "arcade");

        let spaceText = new Text("Space - Shoot", 605, 430, "37pt", "arcade");
        let zText = new Text("z - activate Special abillity", 800, 500, "37pt", "arcade");

        let btnText = new Text("back", 70, "center", "13px");
        let backButton = new Button(20, 20, 120, 40, "/src/assets/ui/back-plain.png", btnText);
        
        backButton.addOnClick(() => {

            sceneManager.setScene("main-menu");
        });

        this.addSubject(backButton);

        this.widgets = [wasd,wasdText,spacez,spaceText,zText, backButton];
    }
}