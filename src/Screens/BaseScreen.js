
import { Observer } from "../BaseTypes/Observer.js";

export class BaseScreen extends Observer{
    constructor(sceneId,title, background = "") {
        super();
        this.title = title;
        this.background = background;
        this.widgets = [];
        this.isActive = false;
        this.sceneId = sceneId;
    }

    activate() { this.isActive = true }
    deactivate() {this.isActive = false}

    addWidget(widget) {
        this.widgets.push(widget);
    }

    removeWidget(widget) {
        for (let i = 0; i < this.widgets.length; i++){
            if (this.widgets[i] == widget) {
                this.widgets.splice(i, 1);
                break;
            }
            
        }
    }

    getSceneId() {
        return this.sceneId;
    }

    getWidgets() {
        return this.widgets;
    }

    getWidgetById(id) {

        for (let i = 0; i < this.widgets.length; i++){
            if (this.widgets[i].getID() == id) {
                return this.widgets[i];
            }
            
        }
    }

    getTitle() {
        return this.title;
    }

    notifySubjects(event) {
        if (!this.isActive)
            return;
        
        for (let i = 0; i < this.subjects.length; i++)
            this.subjects[i].notify(event);
    }


    //when receives notification
    notify(event) {

        if (!this.isActive)
        return;

        for (let i = 0; i < this.subjects.length; i++) {
            let subject = this.subjects[i];

            if (event.type == 'mousemove') {

                if (event.data.x > subject.posX && event.data.x < subject.posX + subject.width &&
                    event.data.y > subject.posY && event.data.y < subject.posY + subject.height) {
                    subject.setMouseOver(true);
                }
                else
                    subject.setMouseOver(false);

            }
            if (event.type == 'click') {
               // console.log(`postion: ${event.data.x} rect: ${subject.posX} ${subject.posX + subject.width}`);


                if (event.data.x > subject.posX && event.data.x < subject.posX + subject.width &&
                    event.data.y > subject.posY && event.data.y < subject.posY + subject.height) {

                    subject.click();
                }
            }

        }



    }

}