import { Component, OnInit } from '@angular/core';
import { TabView, SelectedIndexChangedEventData, TabViewItem } from "ui/tab-view";
import { RouterExtensions } from "nativescript-angular";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";
import * as application from "application";


@Component({
	selector: 'home',
	templateUrl: './pages/home/home.component.html',
	styleUrls: ['./pages/home/home.component.css']
})

export class HomeComponent implements OnInit {

	constructor(private routerExtensions: RouterExtensions) { }

	ngOnInit() {
		if (!isAndroid) {
			return;
		}
		application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
			data.cancel = true;
			this.routerExtensions.back();
		});
	}

}