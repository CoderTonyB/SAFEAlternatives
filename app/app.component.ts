import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { isAndroid } from "platform";
import { StateService } from "../app/services/state.service";


@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit {
    showBack: boolean = false;

    constructor(private routerExtensions: RouterExtensions, private stateService: StateService) {
        this.stateService.showBack.subscribe(showBack => this.showBack = showBack);
    }

    goBack() {
        this.routerExtensions.back();
    }

    ngOnInit(): void {
        //this.showBack = !isAndroid;
    }
}


