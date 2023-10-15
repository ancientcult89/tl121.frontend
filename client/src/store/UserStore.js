import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._role = -1;
        // отслеживает состояние и при изменении вызывает ререндер
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    setRole(roleName) {
        this._role = roleName;
    }

    get role() {
        return this._role;
    }
}