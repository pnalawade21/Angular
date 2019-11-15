import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { GetProductsComponent } from './get-products/get-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import {SlimLoadingBarModule} from '@cime/ngx-slim-loading-bar';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddProductsComponent,
    GetProductsComponent,
    EditProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [BrowserModule, SlimLoadingBarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
