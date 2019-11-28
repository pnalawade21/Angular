import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';
import Product from '../Product';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit {

  product:any = {};
  angFormEdit:FormGroup;

  constructor(private route:ActivatedRoute,  private router:Router,  private ps:ProductService, private fb:FormBuilder) {
      this.createForm();
     }

  createForm() {
      this.angFormEdit = this.fb.group({
        product_name:['', Validators.required ],
        product_cost:['', Validators.required ],
        manufacturer_name:['', Validators.required ],
        effective_date:['', Validators.required ],
        expiry_date:['', Validators.required ]
      });      
    }
    
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ps.editProduct(params['id']).subscribe((res) => {
        this.product = res[0];
      });
    });
  }

  updateProduct(product_name, product_cost, manufacturer_name, effective_date, expiry_date){
    this.route.params.subscribe(params => {
      var promise = this.ps.updateProduct(product_name, product_cost, manufacturer_name, effective_date, expiry_date, params['id']); 
      //promise.then((data) => {
      //  this.router.navigate(["products"]);
     // });           
    });
  }
}
