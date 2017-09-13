import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");

@Injectable()
export class DataService {
    private database: any;

    constructor() {
        if (!Sqlite.exists("SAFE.db")) {
            Sqlite.copyDatabase("SAFE.db");
        }
    }

    getLogList() {
        (new Sqlite("SAFE.db")).then(db => {
            this.database = db;
            this.database.all("SELECT * FROM LogList").then((rows: Array<any>) => {
                console.log("Rows found:", rows.length);
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });


    }


}