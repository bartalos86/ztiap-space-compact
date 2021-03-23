export class Observer{
    
    constructor() {
        this.subjects = []
    }

    addSubject(subj) {
        this.subjects.push(subj);
    }

    notifySubjects(event) {
        for (let i = 0; i < this.subjects.length; i++)
            this.subjects[i].notify(event);
    }
}