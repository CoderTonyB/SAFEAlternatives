import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../../services/data.service";
import { Log } from "../../models/Log"
import * as dialogs from "ui/dialogs";
import { StateService } from '../../services/state.service'

@Component({
	selector: 'LogInventory',
	templateUrl: './pages/LogInventory/LogInventory.component.html',
	styleUrls: ['./pages/LogInventory/LogInventory.component.css']
})

export class LogInventoryComponent implements OnInit {
	logTypeId: number;

	logs: Array<Log>;
	constructor(private route: ActivatedRoute, private dataService: DataService,
		private routerExtensions: RouterExtensions, private stateService: StateService
	) {
		this.logs = new Array<Log>();
		const id = this.route.snapshot.params["id"];
		this.logTypeId = id;
		this.stateService.setShowback(true);
		this.dataService.getLogInventory(id).then((x) => {
			this.logs = x;
		}, err => console.dir(err));
	}

	newLog() {

		dialogs.prompt({
			title: "New Log",
			message: "Please enter a title for your new log",
			okButtonText: "Save",
			cancelButtonText: "Cancel",
			defaultText: "Untitled",
			inputType: dialogs.inputType.text
		}).then(result => {
			if (result.result) {
				this.OpenLogDataEntry(this.logTypeId * -1, result.text); //sending negitive to indicate new
			}
		});


	}

	OpenLogDataEntry(LogId: Number, Title: string = "") {
		console.log("open log:", LogId, " title:", Title);
		this.routerExtensions.navigate(['/home', { outlets: { logoutlet: ['logdataentry', LogId, Title] } }]);
	}

	ngOnInit() { }
}