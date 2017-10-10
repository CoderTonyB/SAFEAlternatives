import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { isAndroid } from "platform";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit {
    showBack: boolean = false;

    constructor(private routerExtensions: RouterExtensions) {

    }

    goBack() {
        this.routerExtensions.back();
    }

    ngOnInit(): void {
        this.showBack = !isAndroid;
    }
}


