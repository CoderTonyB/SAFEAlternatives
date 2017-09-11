import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { HomeComponent } from "./pages/home/home.component"
import { SAFEHomeComponent } from "./pages/SAFEHome/SAFEHome.component"



const routes: Routes = [
    { path: "", redirectTo: "/home/(homeoutlet:safehome)", pathMatch: "full" },
    {
        path: "home", component: HomeComponent,
        children: [
            { path: "safehome", component: SAFEHomeComponent, outlet: 'homeoutlet' },
            { path: "LogHome", component: ItemsComponent, outlet: 'logoutlet' },
            { path: "AssessHome", component: ItemsComponent, outlet: 'assessoutlet' }
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