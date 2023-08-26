import {makeAutoObservable} from "mobx";

export default class ProjectStore {
    constructor() {
        this._projects = [];

        // отслеживает состояние и при изменении вызывает ререндер
        makeAutoObservable(this);
    }

    setProjects(projects) {
        this._projects = projects;
    }
    get projects() {
        return this._projects;
    }
}