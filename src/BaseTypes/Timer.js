export class Timer {
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

export class AdvancedTimer extends Timer {
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