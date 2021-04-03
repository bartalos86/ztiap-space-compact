import { BaseScreen } from "../Screens/BaseScreen.js";
import { ControlsScreen } from "../Screens/ControlsScreen.js";
import { GameScreen } from "../Screens/GameScreen.js";
import { MainMenu } from "../Screens/MainMenu.js";
import { ImageWidget } from "../Controls/Image.js";
import { ToggleButton } from "../Controls/Button.js";
import { GameOverScreen } from "../Screens/GameOverScreen.js";
import { ScoreboardScreen } from "../Screens/ScoreboardScreen.js";
import { SpaceCenterScreen } from "../Screens/SpaceCenterScreen.js";

export class SceneManager {
    constructor(controller, audioManager, gameManager) {
        this.curentSceneId = "main-menu";
        this.prevSceneId = null;
        this.prevScene = null;

        this.currentScene = null;
        this.controller = controller;
        this.audioManager = audioManager;
        this.gameManager = gameManager;

        this.globalScene = this.createGlobalScene();
        controller.addSubject(this.globalScene);
        


        this.sceneCollection = [new MainMenu(this), new ControlsScreen(this), new GameScreen(this), new GameOverScreen(this), new ScoreboardScreen(this), new SpaceCenterScreen(this)];
        this.setScene("main-menu");
    }

    getCurrentScene() {
        return this.currentScene;
    }

    getCurrentSceneId() {
        return this.curentSceneId;
    }

    getGlobalScene() {
        return this.globalScene;
    }

    createGlobalScene() {
        let global = new BaseScreen("global", "Global HUD", "");

        //HUD buttons
        let musicOn = new ImageWidget("/src/assets/ui/music-on.png", "center", "center", 30, 30);
        let musicOff = new ImageWidget("/src/assets/ui/music-off.png", "center", "center", 30, 30);
        let musicBtn = new ToggleButton(1170, 670, 40, 40, musicOn, musicOff);

        musicBtn.addOnClick(() => this.audioManager.toggleMusic());

        let soundOn = new ImageWidget("/src/assets/ui/sound-on.png", "center", "center", 30, 30);
        let soundOff = new ImageWidget("/src/assets/ui/sound-off.png", "center", "center", 30, 30);
        let soundBtn = new ToggleButton("right", 670, 40, 40, soundOn, soundOff);

        soundBtn.addOnClick(() => this.audioManager.toggleEffects());


        global.addSubject(musicBtn);
        global.addSubject(soundBtn);

        global.addWidget(musicBtn)
        global.addWidget(soundBtn);

        global.activate();

        return global;
    }

    setScene(sceneID) {
        this.prevScene = this.currentScene;
        this.prevSceneId = this.curentSceneId;

        if (this.prevScene != null) {
            this.prevScene.deactivate();
            this.controller.removeSubject(this.prevScene);
        }

        for (let i = 0; i < this.sceneCollection.length; i++) {
            if (sceneID == this.sceneCollection[i].getSceneId()) {
                this.curentSceneId = sceneID;
                this.currentScene = this.sceneCollection[i];
                this.currentScene.activate();
                this.controller.addSubject(this.currentScene);

            }
        }
    }

    getScene(sceneId) {
        for (let i = 0; i < this.currentScene.length; i++) {
            if (this.currentScene[i] == sceneId) {
                return this.currentScene[i];
            }
        }
    }

    getAudioManager() {
        return this.audioManager;
    }

    getGameManager() {
        return this.gameManager;
    }
}