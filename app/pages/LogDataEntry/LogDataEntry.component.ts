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

	constructor(private route: ActivatedRoute, private dataService: DataService) { }

	ngOnInit() {
		const id = this.route.snapshot.params["id"];
		if (id > 0) { //load an existing set of answers
			this.dataService.getLogTypeForLog(id).then(LogTypeId => {
				this.LoadQuestions(LogTypeId).then(questions => {
					this.Questions = questions;
					this.LoadAnswers(id);
				});
			});
		} else { //load a blank set of questions
			this.LoadQuestions(-id).then(questions => this.Questions = questions);
		}
	}

	private LoadAnswers(id) { //placeholder!
		for (var index = 0; index < this.Questions.length; index++) {
			this.Answers.push("Answer " + index.toString());
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