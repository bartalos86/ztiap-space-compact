import { Button } from "../Controls/Button.js";
import { Text } from "../Controls/Text.js";
import { BaseScreen } from "./BaseScreen.js";

export class GameScreen extends BaseScreen{
    constructor(game) {
        super("Main menu", "");
        let btnText = new Text("back", 15, -5, "20px");
        let backButton = new Button(20, 20, 120, 40, "/src/assets/ui/back-plain.png", btnText);
        
        backButton.addOnClick(() => {

            game.setScene("menu");
        });
        
        this.addSubject(backButton);
        this.widgets = [backButton];
    }
    
    
 }