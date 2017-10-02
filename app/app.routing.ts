import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { HomeComponent } from "./pages/home/home.component";
import { SAFEHomeComponent } from "./pages/SAFEHome/SAFEHome.component";
import { LogHomeComponent } from "./pages/LogHome/LogHome.component";
import { LogListComponent } from "./pages/LogList/LogList.component";
import { LogInventoryComponent } from "./pages/LogInventory/LogInventory.component";
import { LogDataEntryComponent } from "./pages/LogDataEntry/LogDataEntry.component";

const routes: Routes = [
    { path: "", redirectTo: "/home/(homeoutlet:safehome//logoutlet:loghome//assessoutlet:assesshome)", pathMatch: "full" },
    {
        path: "home", component: HomeComponent,
        children: [
            { path: "safehome", component: SAFEHomeComponent, outlet: 'homeoutlet' },
            { path: "loghome", component: LogHomeComponent, outlet: 'logoutlet' },
            { path: "loglist", component: LogListComponent, outlet: 'logoutlet' },
            { path: "loginventory/:id", component: LogInventoryComponent, outlet: 'logoutlet' },
            { path: "logdataentry/:id/:title", component: LogDataEntryComponent, outlet: 'logoutlet' },
            { path: "assesshome", component: SAFEHomeComponent, outlet: 'assessoutlet' }
        ]
    },
    { path: "items", component: ItemsComponent },
    { path: "item/:id", component: ItemDetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }