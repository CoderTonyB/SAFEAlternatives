import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");
import { Log } from "../models/Log"
import { LogData } from "../models/LogData"

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

    getLogInventory(LogId: Number): Promise<Array<LogData>> {
        return new Promise((resolve, reject) => {
            let logData: Array<LogData> = new Array<LogData>();

            this.database.all("SELECT distinct LogDataId, TimeStamp FROM LogData where LogId = ? order by Timestamp Desc", [LogId]).then((rows: Array<any>) => {
                console.log("Rows found:", rows.length);
                rows.forEach(row => {
                    console.log("pushing:", row[0]);
                    let log = new LogData();
                    log.LogId = row[0];
                    log.TimeStamp = row[1];
                    logData.push(log);
                });
                resolve(logData);
            }, error => {
                console.log("SELECT ERROR", error);
                reject(error);
            });
        });
    }

    getLogList(): Promise<Array<Log>> {
        return new Promise((resolve, reject) => {
            let logList: Array<Log> = new Array<Log>();

            this.database.all("SELECT LogId, LogName FROM LogList order by LogId").then((rows: Array<any>) => {
                console.log("Rows found:", rows.length);
                rows.forEach(row => {
                    console.log("pushing:", row[1]);
                    let log = new Log();
                    log.LogId = row[0];
                    log.LogName = row[1];
                    logList.push(log);
                });
                resolve(logList);
            }, error => {
                console.log("SELECT ERROR", error);
                reject(error);
            });
        });


    }


}