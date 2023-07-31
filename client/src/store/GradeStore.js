import {makeAutoObservable} from "mobx";

export default class GradeStore {
    constructor() {
        this._grades = [];
        this._selectedGrade = {};


        // отслеживает состояние и при изменении вызывает ререндер
        makeAutoObservable(this);
    }

    setGrades(grades) {
        this._grades = grades;
    }
    get grades() {
        return this._grades;
    }

    setSelectedGrade(grade) {
        this._selectedGrade = grade;
    }
    get selectedGrade() {
        return this._selectedGrade;
    }
}