import { Component, Inject } from '@angular/core';
import { Customer } from '../class/customer';
import { Http } from '@angular/http';
//import { CUSTOMERS } from '../dummyData/customerDummyData';

@Component({
    selector: 'customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})

/** customer component*/
export class CustomerComponent {
    public customers: Customer[];
    p: Number = 1;
    //ngOnInit(): void {
    //    this.customers = CUSTOMERS;
    //}

    /** customer ctor */
    constructor(http: Http, @Inject('BASE_URL') baseUrl: String) {
        http.get(baseUrl + 'api/Customer/GetCustomers').subscribe(result => {
            this.customers = result.json() as Customer[];
        }, error => console.error(error));
    }
}