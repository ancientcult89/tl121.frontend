import {makeAutoObservable} from "mobx";

export default class GradeStore {
    constructor() {
        this._grades = [];

        // отслеживает состояние и при изменении вызывает ререндер
        makeAutoObservable(this);
    }

    setGrades(grades) {
        this._grades = grades;
    }
    get grades() {
        return this._grades;
    }
}