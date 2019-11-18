import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri = "http://localhost:4000/product";

  constructor(private http: HttpClient) {

   }

   addProduct(product_name, product_cost, manufacturer_name, effective_date, expiry_date){
     const obj = {
      product_name: product_name,
      product_cost: product_cost,
      manufacturer_name: manufacturer_name,
      effective_date : effective_date,
      expiry_date: expiry_date
     };

     console.log(obj);

     this.http.post('${this.uri}/create', obj).subscribe(res => console.log('Done'));
   }
}
