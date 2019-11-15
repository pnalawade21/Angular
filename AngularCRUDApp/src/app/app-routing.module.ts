import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetProductsComponent } from './get-products/get-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { AddProductsComponent } from './add-products/add-products.component';


const routes: Routes = [
  {
    path: 'products/create',
    component: AddProductsComponent
  },
  {
    path: 'products/edit/:id',
    component: EditProductsComponent
  },
  {
    path: 'products',
    component: GetProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
