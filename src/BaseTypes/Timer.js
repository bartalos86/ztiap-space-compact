export class Timer{
    constructor(interval) {
        this.timeElapsed = true;
        this.interval = interval;
        
    }

    activate() {
        if (this.timeElapsed) {
            this.timeElapsed = false;
            setTimeout(() => this.timeElapsed = true, this.interval);
            return true;
        }

        return false;
    }
}