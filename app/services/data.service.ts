import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");
import { Log } from "../models/Log";
import { LogType } from "../models/LogType";
import { Question } from "../models/Question";

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

            this.database.all("SELECT LogId, TimestampUTC, Title, LogTypeId FROM Logs where LogTypeId = ? order by TimestampUTC Desc", [LogTypeId]).then((rows: Array<any>) => {
                rows.forEach(row => {
                    let log = new Log();
                    log.LogId = row[0];
                    log.TimestampUTC = new Date(row[1]).toLocaleString();
                    log.Title = row[2];
                    log.LogTypeId = row[3];
                    logs.push(log);
                });
                resolve(logs);
            }, error => {
                console.log("SELECT ERROR", error);
                reject(error);
            });
        });
    }

    getLogTypeForLog(LogId: number): Promise<number> {
        let result: Promise<number> = new Promise((resolve, reject) => {

            this.database.get("SELECT LogTypeId from Logs where LogId = ?", LogId).then((row) => {
                resolve(row[0]);
            }, error => {
                console.log("SELECT ERROR", error);
                return error;
            });
        });

        return result;
    }

    getLogTypes(): Promise<Array<LogType>> {
        return new Promise((resolve, reject) => {
            let LogTypes: Array<LogType> = new Array<LogType>();

            this.database.all("SELECT LogTypeId, LogType FROM LogTypes order by LogTypeId").then((rows: Array<any>) => {
                rows.forEach(row => {
                    let logType = new LogType();
                    logType.LogTypeId = row[0];
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

    getQuestionsForLogType(LogTypeId: number): Promise<Array<Question>> {
        return new Promise((resolve, reject) => {
            let Questions: Array<Question> = new Array<Question>();

            this.database.all(`Select QuestionId, Question, Hint, Required, LogTypeId, QuestionOrder from Questions 
                where LogTypeId = ? 
                order by QuestionOrder`, [LogTypeId]).then((rows: Array<any>) => {
                    rows.forEach(row => {
                        let question = new Question();
                        question.QuestionId = row[0];
                        question.Question = row[1];
                        question.Hint = row[2];
                        question.Required = row[3];
                        question.LogTypeId = row[4];
                        Questions.push(question);
                    });
                    resolve(Questions);
                }, error => {
                    console.log("SELECT ERROR", error);
                    reject(error);
                });
        });


    }


}