import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import Product from '../Product';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.scss']
})
export class GetProductsComponent implements OnInit {

  products: Product[];
  constructor(private ps:ProductService) { }

  ngOnInit() {
    this.ps.getProducts().subscribe((data: Product[]) =>{ 
      this.products = data;    
      console.log(this.products);
    }, error => console.log(error));
  }
}
