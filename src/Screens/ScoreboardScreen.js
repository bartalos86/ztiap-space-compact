import { ImageWidget } from "../Controls/Image.js";
import { Text, TextWithShadow } from "../Controls/Text.js";
import { BaseScreen } from "./BaseScreen.js";
import { Button } from "../Controls/Button.js";
import { TextShadow } from "../BaseTypes/TextShadow.js";

export class ScoreboardScreen extends BaseScreen {
    constructor(sceneManager) {
        super("scoreboard", "Scoreboard screen", "/src/assets/background/bg.svg");

        //This will bee from API (localstorage)
        this.highscores = [];

        let titleText = new TextWithShadow("Scoreboard", "center", 120, "80pt", "arcade");

        let backBtnText = new Text("back", 70, "center", "13px");
        let backButton = new Button(20, 20, 120, 40, "/src/assets/ui/back-plain.png", backBtnText);

        let planetDecor = new ImageWidget("/src/assets/decors/earth.png", 140, 470, 130, 130);

        let marsDecor = new ImageWidget("/src/assets/decors/mars2.png", 700, 250, 200, 200);
        let marsDecorSmall = new ImageWidget("/src/assets/decors/mars1.png", 880, 290, 50, 50);

        let shadow = new TextShadow(1,4,"black")
        let playerNameText = new Text("Player name", 370, 235, "25pt", "arcade","white",shadow);
        let dateText = new Text("Date", 700, 235, "25pt", "arcade","white",shadow);
        let scoreText = new Text("Score", 950, 235, "25pt", "arcade","white",shadow);

        let divider = new ImageWidget("/src/assets/ui/divider.png", "center", 250, 750, 1);

        backButton.addOnClick(() => {

            sceneManager.setScene("main-menu");
        });

        this.addSubject(backButton);

        let scoreBg = new ImageWidget("/src/assets/ui/score-bg.png", "center", 160, 900, 500);

        this.widgets = [marsDecor, marsDecorSmall, titleText, scoreBg, divider, playerNameText, dateText, scoreText, backButton, planetDecor];
        
        this.addHighscore("mark", "2021.4.1", 300);
        this.addHighscore("jani", "2021.4.1", 400);
        this.addHighscore("pista", "2021.4.1", 500);
        this.addHighscore("andras", "2021.4.1", 900);
        this.addHighscore("geri", "2021.4.1", 800);
        this.addHighscore("bartalos86", "2021.4.1", 200);
        this.addHighscore("bartalos86", "2021.4.1", 200);
        this.addHighscore("bartalos86", "2021.4.1", 200);
        this.addHighscore("bartalos86", "2021.4.1", 200);
        this.addHighscore("Destroyer200", "2021.4.1", 10000000);
        this.addHighscore("anonymous", "2021.4.1", 2800);

    }

    addHighscore(name, date, score) {
        let scoreObj = new Score(name, date, score);
        this.highscores.push(scoreObj);
        
        this.updateHSComponents();
        
    }

    updateHSComponents() {
        this.highscores = this.highscores.sort((score, prev) => prev.score - score.score);

        this.highscores = this.highscores.map((score, index) => { score.setY(300 + index * 60); return score;});
       // console.log(this.highscores);

        //Removes the text elements
        for (let i = 0; i < this.highscores.length; i++){
            let scoreObj = this.highscores[i];
            let components = scoreObj.getTextComponents();
            this.removeWidget(components[0]);
            this.removeWidget(components[1]);
            this.removeWidget(components[2]);
        }

        //console.log(this.highscores);

        let numOfScores = 6;
        if (this.highscores.length < 6)
            numOfScores = this.highscores.length;

        for (let i = 0; i < numOfScores; i++){
            let scoreObj = this.highscores[i];
            console.log(scoreObj);
            scoreObj.getTextComponents().forEach(widget => {
                this.addWidget(widget);
            });
        }

    }

}

export class Score{
    constructor(name, date, score) {
        this.name = name;
        this.date = date;
        this.score = score;
        
        let nameText = new Text(name, 350, this.posY, "15pt", "pixel");
        let dateText = new Text(date, 700, this.posY, "15pt", "pixel");
        let scoreText = new Text(String(score), 950, this.posY, "15pt", "pixel");

        nameText.setID("score-component");
        dateText.setID("score-component");
        scoreText.setID("score-component");

        this.textComponents = [nameText, dateText, scoreText];
    }


    setY(posY) {
        this.posY = posY;
        this.textComponents.forEach(comp => comp.setY(posY));
        
    }

    getTextComponents() {
        return this.textComponents;
    }
}