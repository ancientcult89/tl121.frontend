import {makeAutoObservable} from "mobx";
import {enLocale} from "../locales/en-En";

export default class LocaleStore {
    constructor() {
        this._locale = {};

        // отслеживает состояние и при изменении вызывает ререндер
        makeAutoObservable(this);
    }

    setLocale(localeType) {
        if(localeType === 'En')
            this._locale = enLocale;
        else
            this._locale = enLocale;
    }
    get locale() {
        return this._locale;
    }
}