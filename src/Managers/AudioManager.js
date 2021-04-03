import { Music, Audio } from "../BaseTypes/Audio.js";

export class AudioManager{

    constructor() {
    
        this.effects = [];
        this.music = [];

        this.initEffects();
        this.initMusic();

        this.musicMuted = false;
        this.effectsMuted = false;

        this.currentMusic = null;
    }

    initEffects() {
        this.effects["shoot"] = new Audio("/src/assets/audio/Shoot.wav");
        this.effects["boss-attack"] = new Audio("/src/assets/audio/Boss-attack.wav");
        this.effects["boss-defeat"] = new Audio("/src/assets/audio/Boss-defeat.wav");
        this.effects["explosion"] = new Audio("/src/assets/audio/Explosion.wav");
        this.effects["shot"] = new Audio("/src/assets/audio/Shot.wav");
        this.effects["gameover"] = new Audio("/src/assets/audio/gameover.wav");
    }

    initMusic() {
        this.music["background-1"] = new Music("/src/assets/audio/musicbg-1.mp3");
        this.music["background-2"] = new Music("/src/assets/audio/musicbg-2.mp3");
    }

    playEffect(effectId) {
        if (this.effectsMuted)
            return;

            this.effects[effectId].play();
            //this.effects[effectId].play();

        //new Promise(() => this.effects[effectId].play());
    }

    playMusic(musicId) {
            
        if (!this.musicMuted)
            this.music[musicId].play();
        
        this.currentMusic = this.music[musicId];
    }

    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.stop();
            this.currentMusic = null;
        }
    }

    toggleMusic() {
        this.musicMuted = !this.musicMuted;

        if (this.musicMuted && this.currentMusic) {
            this.currentMusic.stop();
        }

        if (!this.musicMuted && this.currentMusic) {
            this.currentMusic.play();
        }
    }

    toggleEffects() {
        this.effectsMuted = !this.effectsMuted;

    }



}