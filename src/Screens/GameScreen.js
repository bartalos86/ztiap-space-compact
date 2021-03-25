import { Button,ToggleButton } from "../Controls/Button.js";
import { Text } from "../Controls/Text.js";
import { BaseScreen } from "./BaseScreen.js";

export class GameScreen extends BaseScreen{
    constructor(sceneManager) {
        super("game","Main menu", "");
        let btnText = new Text("back", 70, "center", "13px");
        let backButton = new Button(20, 20, 120, 40, "/src/assets/ui/back-plain.png", btnText);

 
        
        backButton.addOnClick(() => {

            sceneManager.setScene("main-menu");
        });

        this.addSubject(backButton);

        this.widgets = [backButton];
    }
    
    
 }