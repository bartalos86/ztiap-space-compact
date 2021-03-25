export class Observer {

    constructor() {
        this.subjects = []
    }

    addSubject(subj) {
        this.subjects.push(subj);
    }

    removeSubject(subject) {
        for (let i = 0; i < this.subjects.length; i++) {
            if (this.subjects[i] == subject) {
                this.subjects.splice(i, 1);
                break;
            }
        }

    }

    addBatchSubjects(subjects) {
        for (let i = 0; i < subjects.length; i++)
            this.subjects.push(subjects[i]);
    }

    notifySubjects(event) {
        for (let i = 0; i < this.subjects.length; i++)
            this.subjects[i].notify(event);
    }
}