import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular"
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { ItemService } from "./item/item.service";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { HomeComponent } from "./pages/home/home.component";
import { SAFEHomeComponent } from "./pages/SAFEHome/SAFEHome.component"
import { LogHomeComponent } from "./pages/LogHome/LogHome.component"
import { LogListComponent } from "./pages/LogList/LogList.component"
import { LogInventoryComponent } from "./pages/LogInventory/LogInventory.component"
import { LogDataEntryComponent } from "./pages/LogDataEntry/LogDataEntry.component"

import { DataService } from "./services/data.service"

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptRouterModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
        HomeComponent,
        SAFEHomeComponent,
        LogHomeComponent,
        LogListComponent,
        LogInventoryComponent,
        LogDataEntryComponent
    ],
    providers: [
        ItemService, DataService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
