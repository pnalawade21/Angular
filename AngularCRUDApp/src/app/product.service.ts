import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri = "http://localhost:1337/api/products";

  constructor(private http: HttpClient, private router:Router) {

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

     var promise = this.http.post(this.uri, obj).toPromise();
      //promise;
      promise.then((data)=>{
        this.router.navigate(["products"]);
      }).catch(error => {
        console.log(error);
      });
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
     //promise;
      promise.then((data)=>{
        this.router.navigate(["products"]);
      }).catch(error => {
        console.log(error);
      });
   }

   getProducts(){
     return this.http.get(this.uri);
   }

   editProduct(id){
    return this.http.get(this.uri +"/"+ id);
  }

  deleteProduct(id){
    var promise = this.http.delete(this.uri +"/"+ id).toPromise();
    promise.then((data) =>{   
      this.redirectTo(this.router.url);   
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }
  //Function to Reload same component
  redirectTo(uri) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    };

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }
}
