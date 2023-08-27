import {makeAutoObservable} from "mobx";

export default class MeetingStore {
    constructor() {
        this._meetings = [];

        // отслеживает состояние и при изменении вызывает ререндер
        makeAutoObservable(this);
    }

    setMeetings(meetings) {
        this._meetings = meetings;
    }
    get meetings() {
        return this._meetings;
    }
}