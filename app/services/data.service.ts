import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");
import { Log } from "../models/Log";
import { LogType } from "../models/LogType";
import { Question } from "../models/Question";
import { LogResponse } from "../models/LogResponse";
import { SelfAssessQuestion } from "../models/SelfAssessQuestion";

@Injectable()
export class DataService {
    private database: any;

    constructor() {
        this.initDatabase();
    }

    initDatabase() {
        if (this.database == undefined) {
            if (!Sqlite.exists("SAFE.db")) {
                Sqlite.copyDatabase("SAFE.db");
                console.log("Initial database created");
            }

            new Sqlite("SAFE.db").then(db => {
                this.database = db;
            }, error => {
                console.log("OPEN DB ERROR", error);
            });

            console.log("Database is initialized");
        }
    }

    logError(error: string) {
        console.log(error);
    }


    AddLog(log: Log): Promise<number> {
        let date = new Date();
        let newID = -1;
        let sql = `INSERT INTO Logs (TimestampUTC, Title, LogTypeId) VALUES (?,?,?)`;

        return new Promise((resolve, reject) => {
            if (!log.Title) {
                log.Title = "Untitled";
            }

            this.database.execSQL(sql, [date.toISOString(), log.Title, log.LogTypeId]).then(response => {
                console.log("Save new log Response:", response);
                newID = response;
                resolve(response);
            }, err => {
                this.logError(err);
                reject(err);
            });
        });
    }


    saveLogResponses(logResponses: Array<LogResponse>, log: Log): Promise<boolean> {
        return new Promise((resolve, reject) => {
            logResponses.forEach(logResponse => {
                if (logResponse.LogResponseId != null) { //update existing
                    let sql = `UPDATE LogResponses set Answer = ? where LogResponseId = ?`;
                    this.database.execSQL(sql, [logResponse.Answer, logResponse.LogResponseId]).then(response => {
                        console.log("Save Response:", response);
                    }, err => {
                        this.logError(err);
                        resolve(false);
                    });
                } else { //first time a response to this question is being saved
                    let sql = `INSERT INTO LogResponses (LogId, QuestionId, Answer) VALUES (?,?,?)`;
                    this.database.execSQL(sql, [log.LogId, logResponse.QuestionId, logResponse.Answer]).then(response => {
                        console.log("Save Response:", response);
                    }, err => {
                        this.logError(err);
                        resolve(false);
                    });
                }
            });
            resolve(true);
        });
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

    getSelfAssessmentQuestions(): Promise<Array<SelfAssessQuestion>> {
        return new Promise((resolve, reject) => {
            let Questions: Array<SelfAssessQuestion> = new Array<SelfAssessQuestion>();

            this.database.all("SELECT QuestionId, [Order], Question, Type, Answer from SelfAssessment order by [Order]").then((rows: Array<any>) => {
                rows.forEach(row => {
                    let Question = new SelfAssessQuestion();
                    Question.QuestionId = row[0];
                    Question.Order = row[1];
                    Question.Question = row[2];
                    Question.Type = row[3];

                    switch (Question.Type) {
                        case 'True/False':
                            if (row[3].toLowerCase() == 'true') {
                                Question.Answer = true;
                            }
                            else {
                                Question.Answer = false;
                            }
                            break;
                        default:
                            Question.Answer = row[4];
                            break;
                    }

                    Questions.push(Question);
                });
                resolve(Questions);
            }, error => {
                console.log("SELECT ERROR", error);
                reject(error);
            });
        });
    }

    getLogResponses(LogId): Promise<Array<LogResponse>> {
        return new Promise((resolve, reject) => {
            let LogResponses: Array<LogResponse> = new Array<LogResponse>();

            this.database.all(`Select LogResponseId, LogId, QuestionId, Answer from LogResponses
                            where LogId = ?`, [LogId]).then((rows: Array<any>) => {
                    rows.forEach(row => {
                        let logResponse = new LogResponse();
                        logResponse.LogResponseId = row[0];
                        logResponse.LogId = row[1];
                        logResponse.QuestionId = row[2];
                        logResponse.Answer = row[3];
                        LogResponses.push(logResponse);
                    });
                    resolve(LogResponses);
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