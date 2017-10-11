import { Component, OnInit } from '@angular/core';
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { EventData } from "data/observable";
import { RouterExtensions } from "nativescript-angular";
import { DataService } from "../../services/data.service"
import { StateService } from "../../services/state.service";

@Component({
	selector: 'LogHome',
	templateUrl: './pages/LogHome/LogHome.component.html',
	styleUrls: ['./pages/LogHome/LogHome.component.css']
})

export class LogHomeComponent implements OnInit {
	txtPassword: TextField;
	txtPassword2: TextField;

	constructor(private page: Page,
		private routerExtensions: RouterExtensions,
		private dataService: DataService,
		private stateService: StateService
	) {

	}

	ngOnInit() {
		this.txtPassword = <TextField>this.page.getViewById("txtPassword");
		this.txtPassword2 = <TextField>this.page.getViewById("txtPassword2");
		this.txtPassword.focus();
		this.stateService.setShowback(false);
	}

	savePassword(event: EventData) {
		if (this.txtPassword.text.length < 4) {
			alert('Please enter at least 4 characters for your password');
			return;
		}

		if (this.txtPassword.text != this.txtPassword2.text) {
			alert("Passwords do not match!");
		}
		else {
			this.stateService.setShowback(true);
			this.routerExtensions.navigate(['/home', {
				outlets: { logoutlet: ['loglist'] }
			}]);
		}
	}
}