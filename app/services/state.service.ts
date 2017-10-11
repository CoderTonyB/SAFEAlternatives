import { Injectable } from "@angular/core";
//var Sqlite = require("nativescript-sqlite");
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class StateService {
    showBack: BehaviorSubject<boolean>;

    constructor() {
        this.showBack = new BehaviorSubject<boolean>(false);
    }

    setShowback(showBack: boolean) {
        this.showBack.next(showBack);
    }

}