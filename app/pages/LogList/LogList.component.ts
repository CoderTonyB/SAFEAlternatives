import { Component, OnInit } from '@angular/core';
import * as application from "application";
import { RouterExtensions } from "nativescript-angular";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";

@Component({
	selector: 'LogList',
	templateUrl: './pages/LogList/LogList.component.html',
	styleUrls: ['./pages/LogList/LogList.component.css']
})

export class LogListComponent implements OnInit {

	constructor(private routerExtensions: RouterExtensions) { }

	ngOnInit() {

	}
}