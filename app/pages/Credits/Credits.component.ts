import { Component, OnInit } from '@angular/core';
import * as utils from "utils/utils";
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'Credits',
	templateUrl: './pages/Credits/Credits.component.html',
	styleUrls: ['./pages/Credits/Credits.component.css']
})

export class CreditsComponent implements OnInit {

	constructor() { }

	ngOnInit() { }

	GoToGit() {
		utils.openUrl("https://github.com/CoderTonyB/SAFEAlternatives");
	}
}