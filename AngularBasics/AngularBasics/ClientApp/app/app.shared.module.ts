import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from "ngx-pagination";

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import {HomeComponent} from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { CalculateComponent} from './components/calculate/calculate.component';
import { CustomerComponent} from './components/customer/customer.component';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        CalculateComponent,
        CustomerComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'calculate', component: CalculateComponent },
            { path: 'customer', component: CustomerComponent},
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
