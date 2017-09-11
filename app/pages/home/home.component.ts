import { Component, OnInit } from '@angular/core';
import { TabView, SelectedIndexChangedEventData, TabViewItem } from "ui/tab-view";

@Component({
	selector: 'home',
	templateUrl: './pages/home/home.component.html',
	styleUrls: ['./pages/home/home.component.css']
})

export class HomeComponent implements OnInit {

	constructor() { }

	ngOnInit() { }

	onHomeSelectedIndexChanged(event: SelectedIndexChangedEventData) {
		console.log(event.newIndex);
	}
}