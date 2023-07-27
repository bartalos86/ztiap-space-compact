export class Timer {
    constructor(interval, onStateChangeCallback = null) {
        this.timeElapsed = true;
        this.interval = interval;
        this.onStateChangeCallback = onStateChangeCallback;

    }

    addOnStateChangeCallback(func) {
        this.onStateChangeCallback = func;
    }

    activate() {
        if (this.timeElapsed) {
            this.timeElapsed = false;
            if (this.onStateChangeCallback) this.onStateChangeCallback(false);
            setTimeout(() => { this.timeElapsed = true; if(this.onStateChangeCallback) this.onStateChangeCallback(true)}, this.interval);
            return true;
        }

        return false;
    }


    getIsAvailable() {
        return this.timeElapsed;
    }
}

export class OnTimer extends Timer{
    constructor(interval, onInterval, onStateChangeCallback = null) {
        super(interval, onStateChangeCallback);
        this.onInterval = onInterval;
        this.isInProgress = false;
       
    }


    activate() {

        if (this.timeElapsed) {
            this.timeElapsed = false;
            if (this.onStateChangeCallback) this.onStateChangeCallback(false);
            setTimeout(() => { this.timeElapsed = true; if(this.onStateChangeCallback) this.onStateChangeCallback(true)}, this.interval);
            this.isInProgress = true;
            setTimeout(() => this.isInProgress = false, this.onInterval);
            return true;
        }

       
        return this.isInProgress;
    }

    getIsAvailable() {
        return this.timeElapsed;
    }
}


export class BulletTimer extends Timer {
    constructor(interval, count) {
        super(interval);
        this.maxCount = count;
        this.currentCount = 0;
    }

    activate() {
        if (this.timeElapsed && this.currentCount < this.maxCount) {
            if (this.currentCount >= this.maxCount) {
                this.currentCount = 0;

                this.timeElapsed = false;
                setTimeout(() => this.timeElapsed = true, this.interval);
               
            }

            return true;

        }

        return false;
    }
}