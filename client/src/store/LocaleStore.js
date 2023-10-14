import {makeAutoObservable} from "mobx";
import {enLocale} from "../locales/en-En";
import {ruLocale} from "../locales/ru-Ru";

export default class LocaleStore {
    constructor() {
        this._locale = {};

        // отслеживает состояние и при изменении вызывает ререндер
        makeAutoObservable(this);
    }

    setLocale(localeType) {
        if(localeType === 'en-US')
            this._locale = enLocale;
        if(localeType === 'ru-RU')
            this._locale = ruLocale;
        else
            this._locale = enLocale;
    }
    get locale() {
        return this._locale;
    }
}