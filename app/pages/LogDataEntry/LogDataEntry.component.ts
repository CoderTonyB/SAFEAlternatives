import { LogResponse } from './../../models/LogResponse';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
import { ActivatedRoute } from '@angular/router';
import { DataService } from "../../services/data.service";
import { Question } from "../../models/Question";


@Component({
	selector: 'LogDataEntry',
	templateUrl: './pages/LogDataEntry/LogDataEntry.component.html',
	styleUrls: ['./pages/LogDataEntry/LogDataEntry.component.css']
})

export class LogDataEntryComponent implements OnInit {
	Questions: Array<Question>;
	Answers: Array<string> = new Array<string>();
	LogTypeId: number;
	LogId: number;
	LogResponses: Array<LogResponse>;

	constructor(private route: ActivatedRoute, private dataService: DataService) { }

	ngOnInit() {
		const id = this.route.snapshot.params["id"];
		if (id > 0) { //load an existing set of answers
			this.LogId = id;
			this.dataService.getLogTypeForLog(id).then(LogTypeId => {
				this.LogTypeId = LogTypeId;
				this.LoadQuestions(LogTypeId).then(questions => {
					this.Questions = questions;
					//this.LoadAnswers(id);

					this.dataService.getLogResponses(id).then(logResponses => {
						this.LogResponses = logResponses;
					});
				});
			});
		} else { //load a blank set of questions
			this.LogTypeId = -id;
			this.LogId = -1; //flag as new
			this.LoadQuestions(-id).then(questions => this.Questions = questions);
		}
	}

	private LoadAnswers(id) { //placeholder!
		for (var index = 0; index < this.Questions.length; index++) {
			this.Answers.push("Answer " + index.toString());
		}
	}

	getAnswerIndex(QuestionId: number): number {
		let index = this.LogResponses.findIndex(x => x.QuestionId == QuestionId)
		if (index == -1) { //we don't have an answer in our array, add a blank one
			let logResponse: LogResponse = new LogResponse();
			logResponse.Answer = "";
			logResponse.LogId = this.LogId;
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
		this.Answers.forEach(answer => {
			console.log(answer);
		});
	}
}