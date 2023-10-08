import {makeAutoObservable} from "mobx";

export default class PersonStore {
    constructor() {
        this._persons = [];
        this._selectedPerson = {
            personId: null,
            personName: ''
        };

        // отслеживает состояние и при изменении вызывает ререндер
        makeAutoObservable(this);
    }

    setPersons(persons) {
        this._persons = persons;
    }
    get persons() {
        return this._persons;
    }

    setSelectedPerson(selectedPerson){
        this._selectedPerson = selectedPerson;
    }

    get selectedPerson() {
        return this._selectedPerson;
    }
}