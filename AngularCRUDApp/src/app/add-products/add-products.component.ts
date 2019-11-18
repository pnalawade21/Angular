import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {

  angForm : FormGroup;
  constructor(private fb: FormBuilder, private ps: ProductService) {
      this.CreateForm();
   }

   CreateForm(){
     this.angForm = this.fb.group({
       product_name:['', Validators.required ],
       product_cost:['', Validators.required ],
       manufacturer_name:['', Validators.required ],
       effective_date:['', Validators.required ],
       expiry_date:['', Validators.required ]
     });
   }

   addProduct(product_name, product_cost, manufacturer_name, effective_date, expiry_date)
    {
      this.ps.addProduct(product_name, product_cost, manufacturer_name, effective_date, expiry_date);
    }

  ngOnInit() {
  }

}
