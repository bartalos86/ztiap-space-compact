
import { Observer } from "../BaseTypes/Observer.js";
export class BaseScreen extends Observer{
    constructor(title, background = "") {
        super();
        this.title = title;
        this.background = background;
        this.widgets = [];
    }

    addWidget(widget) {
        this.widgets.push(widget);
    }

    removeWidget(widget) {
        for (let i = 0; i < this.widgets.length; i++){
            if (this.widgets[i] == widget)
                this.widgets.splice(i, 1);
        }
    }

    getWidgets() {
        return this.widgets;
    }

    getTitle() {
        return this.title;
    }

}