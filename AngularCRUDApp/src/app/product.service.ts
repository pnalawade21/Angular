import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Promise } from 'q';

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

   updateProduct(product_name, product_cost, manufacturer_name, effective_date, expiry_date, id) {//: Promise<object>{
      const obj = {
        ProductName:product_name, 
        ProductCost:product_cost, 
        ManufacturerName:manufacturer_name, 
        EffectiveDate:effective_date, 
        ExpiryDate:expiry_date
      };
   
     var promise =  this.http.put(this.uri + "/" + id, obj).toPromise();
     //return promise;
   }

   getProducts(){
     return this.http.get(this.uri);
   }

   editProduct(id){
    return this.http.get(this.uri +"/"+ id);
  }
}
