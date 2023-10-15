import {makeAutoObservable} from "mobx";
import {enLocale} from "../locales/en-En";
import {ruLocale} from "../locales/ru-Ru";

export default class LocaleStore {
    constructor() {
        this._locale = {};
        this._localeName = '';
        // отслеживает состояние и при изменении вызывает ререндер
        makeAutoObservable(this);
    }

    setLocale(localeName) {
        if(localeName === 'en-US')
        {
            this._locale = enLocale;
        }
        if(localeName === 'ru-RU')
        {
            this._locale = ruLocale;
        }
        else
        {
            this._locale = enLocale;
        }
        this._localeName = localeName;
    }
    get locale() {
        return this._locale;
    }
    get localeName() {
        return this._localeName;
    }
}