import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor (private myService: SessionService, private myRouter: Router, private myProducts: ProductService) {}

  ngOnInit() {
    this.showProducts();
  }

  showProducts(){
    this.myProducts.getAllProducts()
    .subscribe ( res => console.log("Sandra's heyyyyy: ", res), 
  err => console.log("We get the err: ", err))
  }

}
