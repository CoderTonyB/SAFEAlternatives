import { Component, OnInit } from '@angular/core';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

import { DataService } from "../../services/data.service";
import { SelfAssessQuestion } from "../../models/SelfAssessQuestion"
import { Switch } from 'tns-core-modules/ui/switch/switch';


@Component({
	selector: 'SelfAssess',
	templateUrl: './pages/SelfAssess/SelfAssess.component.html',
	styleUrls: ['./pages/SelfAssess/SelfAssess.component.css']
})

export class SelfAssessComponent implements OnInit {
	Questions: Array<SelfAssessQuestion> = new Array<SelfAssessQuestion>();
	placeholder: true;

	constructor(private dataService: DataService) { }

	ngOnInit() {
		setTimeout(function (me: any) {
			me.dataService.getSelfAssessmentQuestions().then((questions) => {
				me.Questions = questions;
			}, error => alert("Error:" + error));
		}, 1000, this);
	}

	questionAnswered(event, questionId) {
		console.log(questionId);
		console.dir(event);
	}

	switchChanged(event, questionId) {
		let q = <Switch>event.object;
		this.Questions.find(x => x.QuestionId == questionId).Answer = q.checked;
		console.dir(this.Questions);
	}

	checkBoolean(answer: string): boolean {
		const lcAnswer = (answer) ? answer.toLowerCase() : 'false';//make null answers = false
		if (lcAnswer == 'true') {
			return true;
		} else {
			return false;
		}
	}

	getAnswerIndex(QuestionId: number): number {
		let index = this.Questions.findIndex(x => x.QuestionId == QuestionId)
		return index;
	}


}