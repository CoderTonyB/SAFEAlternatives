import { LogResponse } from './../../models/LogResponse';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
import { ActivatedRoute } from '@angular/router';
import { DataService } from "../../services/data.service";
import { Question } from "../../models/Question";
import { Log } from "../../models/Log";


@Component({
	selector: 'LogDataEntry',
	templateUrl: './pages/LogDataEntry/LogDataEntry.component.html',
	styleUrls: ['./pages/LogDataEntry/LogDataEntry.component.css']
})

export class LogDataEntryComponent implements OnInit {
	Questions: Array<Question>;
	LogResponses: Array<LogResponse> = new Array<LogResponse>();
	LogPrototype: Log = new Log();

	constructor(private route: ActivatedRoute, private dataService: DataService, private router: RouterExtensions) { }

	ngOnInit() {
		const id = this.route.snapshot.params["id"];
		if (id > 0) { //load an existing set of answers
			this.LogPrototype.LogId = id;
			this.dataService.getLogTypeForLog(id).then(LogTypeId => {
				this.LogPrototype.LogTypeId = LogTypeId;
				this.LoadQuestions(LogTypeId).then(questions => {
					this.Questions = questions;
					//this.LoadAnswers(id);

					this.dataService.getLogResponses(id).then(logResponses => {
						this.LogResponses = logResponses;
					});
				});
			});
		} else { //load a blank set of questions
			this.LogPrototype.LogTypeId = -id; //we passed the type as a negative integer since there was no ID
			this.LogPrototype.LogId = -1; //flag as new
			this.LoadQuestions(-id).then(questions => this.Questions = questions);
		}
	}

	getAnswerIndex(QuestionId: number): number {
		let index = this.LogResponses.findIndex(x => x.QuestionId == QuestionId)
		if (index == -1) { //we don't have an answer in our array, add a blank one
			let logResponse: LogResponse = new LogResponse();
			logResponse.Answer = "";
			logResponse.LogId = this.LogPrototype.LogId;
			logResponse.QuestionId = QuestionId;
			return this.LogResponses.push(logResponse) - 1;
		} else {
			return index;
		}
	}

	private LoadQuestions(id: number): Promise<Question[]> {
		return this.dataService.getQuestionsForLogType(id);
	}

	Save() {
		if (this.LogPrototype.LogId == -1) {
			this.dataService.AddLog(this.LogPrototype).then(result => {
				this.LogPrototype.LogId = result;
				this.dataService.saveLogResponses(this.LogResponses, this.LogPrototype).then(result => {
					if (result == true) {
						this.router.back();
					}
				});
			});
		} else {
			this.dataService.saveLogResponses(this.LogResponses, this.LogPrototype).then(result => {
				if (result == true) {
					this.router.back();
				}
			});
		}
	}
}