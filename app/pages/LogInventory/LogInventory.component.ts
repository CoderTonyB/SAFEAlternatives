import { Component, OnInit } from '@angular/core';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../../services/data.service";
import { Log } from "../../models/Log"

@Component({
	selector: 'LogInventory',
	templateUrl: './pages/LogInventory/LogInventory.component.html',
	styleUrls: ['./pages/LogInventory/LogInventory.component.css']
})

export class LogInventoryComponent implements OnInit {
	log: Array<Log>;
	constructor(private route: ActivatedRoute, private dataService: DataService) {
		const id = this.route.snapshot.params["id"];
		this.dataService.getLogInventory(id).then((x) => {
			console.dir(x);
			this.log = x;
		}, err => console.dir(err));
	}

	newLog() {
		console.log("make a new log");
	}

	ngOnInit() { }
}