import { Component, OnInit } from '@angular/core';
import { CUSTOMERS } from '../dummyData/customerDummyData';

@Component({
    selector: 'customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})

/** customer component*/
export class CustomerComponent implements OnInit {
    customers:Object;
    p:Number = 1;
    ngOnInit(): void {
        this.customers = CUSTOMERS;
    }
  
    /** customer ctor */
    constructor() {
       

    }
   
}