import { Component, OnInit } from '@angular/core';
import { EventData } from "data/observable";
import { Button } from "ui/button";

@Component({
	selector: 'SAFEHome',
	templateUrl: './pages/SAFEHome/SAFEHome.component.html',
	styleUrls: ['./pages/SAFEHome/SAFEHome.component.css']
})

export class SAFEHomeComponent implements OnInit {

	constructor() { }

	ngOnInit() { }

	callDontCut(event: EventData) {
		var phone = require("nativescript-phone");
		phone.dial("1-800-366-8288", true);
		console.log(event.eventName);
	}
}