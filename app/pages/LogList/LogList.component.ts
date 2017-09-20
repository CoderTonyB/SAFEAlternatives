import { Component, OnInit } from '@angular/core';
import * as application from "application";
import { RouterExtensions } from "nativescript-angular";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";
import { DataService } from "../../services/data.service";
import { LogType } from "../../models/LogType"

@Component({
	selector: 'LogList',
	templateUrl: './pages/LogList/LogList.component.html',
	styleUrls: ['./pages/LogList/LogList.component.css']
})

export class LogListComponent implements OnInit {
	logs: Array<LogType>;

	constructor(private routerExtensions: RouterExtensions,
		private dataService: DataService
	) { }

	ngOnInit() {
		this.dataService.getLogTypes().then((logs) => {
			this.logs = logs;
		}, error => alert("Error:" + error));
	}

	OpenLogList(LogId: Number) {
		console.log("Open Log Id:", LogId);
		this.routerExtensions.navigate(['/home', { outlets: { logoutlet: ['loginventory', LogId] } }]);


	}
}