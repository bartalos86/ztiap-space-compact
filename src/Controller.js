import { Event } from "./BaseTypes/Event.js";
import { Observer } from "./BaseTypes/Observer.js";

export class Controller extends Observer {

    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.keys = [];
        canvas.addEventListener('click', (ev) => { this.handleClick(ev) });
        canvas.addEventListener('mousemove', (ev) => this.handleMouseMove(ev));
        window.addEventListener('keydown', (ev) => this.handleKeyDown(ev));
        window.addEventListener('keyup', (ev) => this.handleKeyUp(ev));
    }

    handleClick(data) {
        let pos = this.normalizeMousePosition(data);
        this.notifySubjects(new Event("click", pos));
    }

    normalizeMousePosition(data) {

        var rect = this.canvas.getBoundingClientRect(),
            scaleX = this.canvas.width / rect.width,
            scaleY = this.canvas.height / rect.height;

        return {
            x: (data.clientX - rect.left) * scaleX,
            y: (data.clientY - rect.top) * scaleY
        }
    }

    handleMouseMove(data) {
        let pos = this.normalizeMousePosition(data);
        this.notifySubjects(new Event("mousemove", pos));

    }

    handleKeyDown(data) {
        this.keys[data.code] = true;
        this.notifySubjects(new Event("keydown", data));
    }

    handleKeyUp(data) {
        this.keys[data.code] = false;
        this.notifySubjects(new Event("keyup", data));
    }

    getKeys() {
        return this.keys;
    }

}