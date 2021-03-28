import { BaseScreen } from "./BaseScreen.js";
import { Button, ImageButton, TextButton } from "../Controls/Button.js";
import { Text, TextWithShadow } from "../Controls/Text.js";
import { AnimatedImageWidget, ImageWidget } from "../Controls/Image.js";
import { Animation2D } from "../BaseTypes/Animation.js";
import { TextShadow } from "../BaseTypes/TextShadow.js";
import { DefaultProgressbar } from "../Controls/ProgressBar.js";

export class SpaceCenterScreen extends BaseScreen {
    constructor(sceneManager) {
        super("space-center", "Space center", "/src/assets/background/bg.svg");

        this.shipDatabase = new ShipDatabase();

        this.shipInView = this.shipDatabase.getCurrentShip();
        //this.shipInView = this.shipDatabase.getNextShip();

        let titleText = new TextWithShadow("Space Center", "center", 100, "60pt", "arcade");

        let backBtnText = new Text("back", 70, "center", "13px");
        let backButton = new Button(20, 20, 120, 40, "/src/assets/ui/back-plain.png", backBtnText);

        let shipAnimation = new Animation2D(32, 32, 5, 0.2);
        let spaceship = new AnimatedImageWidget(this.shipInView.sprite, "center", 140, 200, 200, shipAnimation);

        spaceship.setID("spaceship-sprite");

        backButton.addOnClick(() => sceneManager.setScene("main-menu"));
        this.addSubject(backButton);

        let leftArrowBtn = new Button(100, 180, 100, 100, "", new ImageWidget("/src/assets/ui/arrow-left.png", "center", "center", 100, 100), new ImageWidget("/src/assets/ui/arrow-left-hover.png", "center", "center", 100, 100));
        let rightArrowBtn = new Button(1080, 180, 100, 100, "", new ImageWidget("/src/assets/ui/arrow-right.png", "center", "center", 100, 100), new ImageWidget("/src/assets/ui/arrow-right-hover.png", "center", "center", 100, 100));

        let textShadow = new TextShadow(1, 3, "black");
        let firepowerText = new Text("Firepower:", 300, 455, "15pt", "pixel", "#FEAE34", textShadow);
        let speedText = new Text("Speed:", 275, 515, "15pt", "pixel", "#FEAE34", textShadow);
        let specialText = new Text("Special ability:", 315, 575, "15pt", "pixel", "#FEAE34", textShadow);

        let firepowerProgress = new DefaultProgressbar(600, 435, 340, 15);
        firepowerProgress.setID("firepower-progress");

        let speedProgress = new DefaultProgressbar(600, 500, 340, 15);
        speedProgress.setID("speed-progress");

        let specialIcon = new ImageWidget("/src/assets/sprites/rocket.png", 600, 550, 72*1.1, 36*1.1);
        specialIcon.setID("special-icon");

        firepowerProgress.setPercentage(this.shipInView.firepower);
        speedProgress.setPercentage(this.shipInView.speed);

        rightArrowBtn.addOnClick(() => this.nextShip());
        leftArrowBtn.addOnClick(() => this.prevShip());

        this.addSubject(leftArrowBtn);
        this.addSubject(rightArrowBtn);
        let selectText = new TextWithShadow("Select", "center", "center", "30pt", "arcade");
        let hoverText = new TextWithShadow("Select", "center", "center", "30pt", "arcade", "#FEAE34");
        let selectButton = new Button("center", 610, 100, 50, "", selectText, hoverText);

        selectButton.addOnClick(() => this.selectShip());

        if (this.shipInView.isSelected) {
            selectText.setText("Selected");
            selectText.setColor("#65CB72");
            selectButton.setContent(selectText);
            selectButton.removeHoverContent();
        } else {
            selectText.setText("Select");
            selectText.setColor("white");
            selectButton.setContent(selectText);
            selectButton.setHoverContent(hoverText);
        }

        selectButton.setID("select-button");
        this.addSubject(selectButton);
        //let speProgress = new DefaultProgressbar(650, 460, 270, 13);

        let scoreBg = new ImageWidget("/src/assets/ui/space-center-bg.png", "center", 350, 1000, 350);

        this.widgets = [scoreBg, backButton, leftArrowBtn, rightArrowBtn, titleText, speedText, specialText,
            spaceship, firepowerText, firepowerProgress, speedProgress, specialIcon, selectButton];
    }

    updateWidgets() {
        let spaceship = this.getWidgetById("spaceship-sprite");
        spaceship.setPath(this.shipInView.sprite);

        let firepower = this.getWidgetById("firepower-progress");
        firepower.setPercentage(this.shipInView.firepower);

        let speed = this.getWidgetById("speed-progress");
        speed.setPercentage(this.shipInView.speed);

        let specialIcon = this.getWidgetById("special-icon");
        specialIcon.setPath("/src/assets/sprites/rocket.png");

        
        let selectButton = this.getWidgetById("select-button");

        if (this.shipInView.isSelected) {
            let selectText = new TextWithShadow("Selected", "center", "center", "30pt", "arcade","#65CB72");
            
            selectButton.setContent(selectText);
            selectButton.removeHoverContent();
        } else {
            let selectText = new TextWithShadow("Select", "center", "center", "30pt", "arcade");
            let hoverText = new TextWithShadow("Select", "center", "center", "30pt", "arcade", "#FEAE34");

            selectButton.setContent(selectText);
            selectButton.setHoverContent(hoverText);
        }

    }

    selectShip() {
        this.shipDatabase.selectCurrentShip();
        this.updateWidgets();
    }


    nextShip() {
        this.shipInView = this.shipDatabase.getNextShip();
        this.updateWidgets();
    }

    prevShip() {
        this.shipInView = this.shipDatabase.getPrevShip();
        this.updateWidgets();
    }
}


 class ShipDatabase {
    constructor() {
        this.ships = [
            { sprite: "/src/assets/sprites/spaceship-sprite.png", firepower: 80, speed: 35, specialIcon: "/src/assets/sprites/rocket.png", isSelected: true },
            { sprite: "/src/assets/sprites/spaceship_speed-sprite.png", firepower: 55, speed: 80, specialIcon: "/src/assets/sprites/rocket.png", isSelected: false },
        ]

        this.prevShip = null;
        this.currentShip = this.ships[0];
        this.currentShipIndex = 0;
        this.selectedSpaceshipId = 0;
    }

    selectCurrentShip() {
        if(this.prevShip)
            this.prevShip.isSelected = false;
        
        this.ships[this.currentShipIndex].isSelected = true;
        
        this.currentShip.selected = true;
    }

    getCurrentShip() { return this.currentShip };


    getNextShip() {
        

        this.prevShip = this.ships[this.currentShipIndex];
        this.currentShipIndex++;

        if (this.currentShipIndex >= this.ships.length)
            this.currentShipIndex = 0;

        this.currentShip = this.ships[this.currentShipIndex];

        return this.currentShip;
    }

    getPrevShip() {
        
        
        this.prevShip = this.ships[this.currentShipIndex];
        this.currentShipIndex--;

        if(this.currentShipIndex < 0)
            this.currentShipIndex = this.ships.length -1;
        
        this.currentShip = this.ships[ this.currentShipIndex];

        return this.currentShip;


        
    }
}