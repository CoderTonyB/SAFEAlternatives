import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");
import { Log } from "../models/Log"
import { LogType } from "../models/LogType"

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

    getLogInventory(LogTypeId: Number): Promise<Array<Log>> {
        return new Promise((resolve, reject) => {
            let logs: Array<Log> = new Array<Log>();

            this.database.all("SELECT * FROM Logs where LogTypeId = ? order by Timestamp Desc", [LogTypeId]).then((rows: Array<any>) => {
                console.log("Rows found:", rows.length);
                rows.forEach(row => {
                    console.log("pushing:", row[0]);
                    let log = new Log();
                    log.LogId = row[0];
                    log.Timestamp = row[1];
                    logs.push(log);
                });
                resolve(logs);
            }, error => {
                console.log("SELECT ERROR", error);
                reject(error);
            });
        });
    }

    getLogTypes(): Promise<Array<LogType>> {
        return new Promise((resolve, reject) => {
            let LogTypes: Array<LogType> = new Array<LogType>();

            this.database.all("SELECT LogTypeId, LogType FROM LogTypes order by LogTypeId").then((rows: Array<any>) => {
                console.log("Rows found:", rows.length);
                rows.forEach(row => {
                    console.log("pushing:", row[1]);
                    let logType = new LogType();
                    logType.LogType = row[0];
                    logType.LogType = row[1];
                    LogTypes.push(logType);
                });
                resolve(LogTypes);
            }, error => {
                console.log("SELECT ERROR", error);
                reject(error);
            });
        });


    }


}