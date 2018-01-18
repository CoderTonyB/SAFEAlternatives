import { Component, OnInit } from '@angular/core';
import * as application from "application";
import { RouterExtensions } from "nativescript-angular";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";
import { DataService } from "../../services/data.service";
import { LogType } from "../../models/LogType"
import { StateService } from '../../services/state.service'
import * as utils from "utils/utils";



@Component({
	selector: 'LogList',
	templateUrl: './pages/LogList/LogList.component.html',
	styleUrls: ['./pages/LogList/LogList.component.css']
})

export class LogListComponent implements OnInit {
	logs: Array<LogType>;

	constructor(private routerExtensions: RouterExtensions,
		private dataService: DataService, private stateService: StateService
	) { }

	ngOnInit() {
		this.stateService.setShowback(false);
		this.dataService.getLogTypes().then((logs) => {
			this.logs = logs;
		}, error => alert("Error:" + error));
	}

	visitURL(url: String) {
		utils.openUrl("https://www.youtube.com/channel/UC-dh1cEUaK6D_vK0cUVCiFQ");
	}

	OpenLogList(LogId: Number) {
		this.routerExtensions.navigate(['/home', { outlets: { logoutlet: ['loginventory', LogId] } }]);


	}
}