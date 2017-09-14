import { Component, OnInit } from '@angular/core';
import * as application from "application";
import { RouterExtensions } from "nativescript-angular";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";
import { DataService } from "../../services/data.service";
import { Log } from "../../models/Log"

@Component({
	selector: 'LogList',
	templateUrl: './pages/LogList/LogList.component.html',
	styleUrls: ['./pages/LogList/LogList.component.css']
})

export class LogListComponent implements OnInit {
	logs: Array<Log>;

	constructor(private routerExtensions: RouterExtensions,
		private dataService: DataService
	) { }

	ngOnInit() {
		this.dataService.getLogList().then((logs) => {
			this.logs = logs;
			console.dir(this.logs);
		}, error => alert("Error:" + error));
	}
}