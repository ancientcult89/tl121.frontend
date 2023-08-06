import {makeAutoObservable} from "mobx";

export default class PersonStore {
    constructor() {
        this._persons = [];

        // отслеживает состояние и при изменении вызывает ререндер
        makeAutoObservable(this);
    }

    setPersons(persons) {
        this._persons = persons;
    }
    get persons() {
        return this._persons;
    }
}