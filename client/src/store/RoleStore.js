import {makeAutoObservable} from "mobx";

export default class RoleStore {
    constructor() {
        this._roles = [];

        // отслеживает состояние и при изменении вызывает ререндер
        makeAutoObservable(this);
    }

    setRoles(grades) {
        this._roles = grades;
    }
    get roles() {
        return this._roles;
    }
}