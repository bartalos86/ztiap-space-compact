export class Audio {

    constructor(path, loop = false) {
        let sound = document.createElement("audio");
        sound.src = path;
        sound.setAttribute("preload", "true");
        sound.setAttribute("contros", "none");
        if (loop) {
            sound.setAttribute("loop", "true");
        }
        sound.style.display = "none";

        sound.volume = 0.15;

        this.sound = sound;
        document.body.appendChild(sound);
    }

    play() {
        this.sound.play();
    }

    stop() {
        this.sound.pause();
    }

    reset() {

    }
}

export class Music extends Audio {
    constructor(path) {
        super(path, true);
        this.sound.volume = 0.5;

    }
}