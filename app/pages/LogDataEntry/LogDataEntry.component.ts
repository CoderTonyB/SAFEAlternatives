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
		this.LoadQuestions(id);

	}

	private LoadQuestions(id: number) {
		this.dataService.getQuestionsForLogType(id).then(result => {
			this.Questions = result;
			for (var index = 0; index < result.length; index++) {
				this.Answers.push("Answer " + index.toString());
			}
		});
	}

	Save() {
		this.Answers.forEach(answer => {
			console.log(answer);
		});
	}
}