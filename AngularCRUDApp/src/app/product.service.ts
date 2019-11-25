import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri = "http://localhost:1337/api/products";

  constructor(private http: HttpClient) {

   }

   addProduct(product_name, product_cost, manufacturer_name, effective_date, expiry_date){
     const obj = {
      ProductName: product_name,
      ProductCost: product_cost,
      ManufacturerName: manufacturer_name,
      EffectiveDate : effective_date,
      ExpiryDate: expiry_date
     };

     console.log(obj);

     this.http.post(this.uri, obj).subscribe(res => console.log('Done'));
   }
}
