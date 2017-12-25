import { Component, OnInit } from '@angular/core';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

import { DataService } from "../../services/data.service";
import { SelfAssessQuestion } from "../../models/SelfAssessQuestion"
import { Switch } from 'tns-core-modules/ui/switch/switch';
import { Slider } from 'tns-core-modules/ui/slider/slider';
import * as email from "nativescript-email";
import { DatePicker } from 'tns-core-modules/ui/date-picker/date-picker';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;


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

	sliderChanged(event, questionId) {
		let q = <Slider>event.object;
		this.Questions.find(x => x.QuestionId == questionId).Answer = q.value;
		//console.log(questionId, "=", q.value);
	}

	datepickerChanged(event, questionId) {
		let q = <DatePicker>event.object;
		//this.Questions.find(x => x.QuestionId == questionId).Answer = q.date;
		console.log(questionId, "=", q.date);
	}

	datepickerTapped(event, questionId) {
		let q = <TextField>event.object;
		q.dismissSoftInput();
		const picker = new ModalPicker();

		picker.pickDate({
			title: "Last SI Date",
			theme: "light",
			maxDate: new Date()
		}).then((result) => {
			q.text = + result.month + "/" + result.day + "/" + result.year;
		}).catch((error) => {
			console.log("Error: " + error);
		});


		//console.log(questionId, "=", q.date);
	}

	switchChanged(event, questionId) {
		let q = <Switch>event.object;
		this.Questions.find(x => x.QuestionId == questionId).Answer = q.checked;
		//console.dir(this.Questions);
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

	scoreAssessment() {
		let q1to14 = this.Questions.filter(x => x.Order < 15 && x.Answer == true).length;
		let q15to23 = this.Questions.filter(x => x.Order >= 15 && x.Order <= 23 && x.Answer == true).length;
		let q24to31 = this.Questions.filter(x => x.Order >= 24 && x.Order <= 31 && x.Answer == true).length;
		let q32to42 = this.Questions.filter(x => x.Order >= 32 && x.Order <= 42 && x.Answer == true).length;


		let mailbody: string = `
		<b>1-14</b> (${q1to14} answered true)<br/>The more questions you answered "true", the more likely it is that your early experiences were similar to those described by self injurers.<br/><br/>
<b>15-23</b> (${q15to23} answered true)<br/>The more questions you answered "true", the more your view of yourself matches the views commonly expressed by self injurers.<br/><br/>
<b>24-31</b> (${q24to31} answered true)<br/>If you answered "true" to any of these questions, it may signal that you have a serious problem with self-injury.<br/><br/>
<b>32-44</b> (${q32to42} answered true`

		let numTimesSI = this.Questions.find(x => x.Order == 43).Answer;
		console.log("numtimesi:", numTimesSI)
		if (numTimesSI > 0) {
			mailbody += ` and you have indicated that you have self injured at least ${numTimesSI} times`
		}

		mailbody += `)<br/>We suggest that anyone who answered "true" to any of these questions might benefit from consultation with a professional who understands self-injury.  You may use the questionnaire as a tool for discussion during the consultation.<br/><br/>
Please send this e-mail to S.A.F.E. ALTERNATIVES if you would like to speak with someone or receive information about self-injury treatment.  Feel free to share this e-mail with anyone who you feel might be able to help you.  <br/><br/>
The answers to your self assessment questions are below. <br/><br/>`;

		for (var index = 0; index < this.Questions.length; index++) {
			mailbody += `<b>${this.Questions[index].Question}</b><br>${this.Questions[index].Answer}<br><br>`
		}
		//console.log(mailbody);

		email.compose({
			subject: "SAFE Alternatives Self Assessment",
			body: mailbody,
			cc: ['info@SAFEAlternatives.org']
		}).then(
			function () {
				//console.log("Email composer closed");
			}, function (err) {
				console.log("Error: " + err);
			});
	}
}