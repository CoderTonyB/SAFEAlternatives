import { Component, OnInit } from '@angular/core';
import { TabView, SelectedIndexChangedEventData, TabViewItem } from "ui/tab-view";
import { RouterExtensions } from "nativescript-angular";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";
import * as application from "application";
import { StateService } from '../../services/state.service'


@Component({
	selector: 'home',
	templateUrl: './pages/home/home.component.html',
	styleUrls: ['./pages/home/home.component.css']
})

export class HomeComponent implements OnInit {

	constructor(private routerExtensions: RouterExtensions, private stateService: StateService) { }

	ngOnInit() {
		if (!isAndroid) {
			return;
		}
		application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
			data.cancel = true;
			this.routerExtensions.back();
		});
	}

	selectTab(event: SelectedIndexChangedEventData) {
		this.stateService.setShowback(event.newIndex == 1); //if we're on the second (log tab), show the back button
	}

}