import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");

@Injectable()
export class DataService {
    private database: any;

    constructor() {
        if (!Sqlite.exists("SAFE.db")) {
            Sqlite.copyDatabase("SAFE.db");
            console.log("Initial database created");
        }
        (new Sqlite("SAFE.db")).then(db => {
            this.database = db;

        }, error => {
            console.log("OPEN DB ERROR", error);
        });
        console.log("Database is initialized");
    }

    getLogList(): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            let logList: Array<string> = new Array<string>();

            this.database.all("SELECT * FROM LogList").then((rows: Array<any>) => {
                console.log("Rows found:", rows.length);
                rows.forEach(row => {
                    console.log("pushing:", row[1]);
                    logList.push(row[1]);
                });
                resolve(logList);
            }, error => {
                console.log("SELECT ERROR", error);
                reject(error);
            });
        });


    }


}