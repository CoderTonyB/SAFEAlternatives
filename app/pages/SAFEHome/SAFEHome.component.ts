import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { EventData } from "data/observable";
import { Button } from "ui/button";
import { CreditsComponent } from '../../pages/Credits/Credits.component'
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";


@Component({
	selector: 'SAFEHome',
	providers: [ModalDialogService],
	templateUrl: './pages/SAFEHome/SAFEHome.component.html',
	styleUrls: ['./pages/SAFEHome/SAFEHome.component.css']
})

export class SAFEHomeComponent implements OnInit {

	constructor(
		private modalService: ModalDialogService,
		private vcRef: ViewContainerRef
	) { }

	ngOnInit() { }

	private openCredits(): Promise<any> {
		const today = new Date();
		const options: ModalDialogOptions = {
			viewContainerRef: this.vcRef,
			context: "",
			fullscreen: false,
		};

		return this.modalService.showModal(CreditsComponent, options);
	}

	callDontCut(event: EventData) {
		var phone = require("nativescript-phone");
		phone.dial("1-800-366-8288", true);
		console.log(event.eventName);
	}
}