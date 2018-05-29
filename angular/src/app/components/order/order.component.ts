import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CookieService } from '../../services/cookie.service';
import { SessionService } from '../../services/auth.service';
import { CartComponent } from '../cart/cart.component';
import {  ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  myOrder: any;
  orderInfo: any = [];
  user: any;

  constructor(
    private myOrders: OrderService,
    private myCookie: CookieService,
    private mySession: SessionService,
    private myCart: CartComponent,
    private myProducts: ProductService,
    private myRouter: Router
  ) { }

  ngOnInit() {
    this.myOrder = this.myCookie.getCookie('browser__settings');
    this.user = this.myCookie.getCookie('user');
  }

  newOrder() {
    console.log("Products in order: ", this.myOrder)
    let subtotal = 0;
    let tax = 6; 

    this.myOrder.forEach( singleProduct => {
      subtotal += singleProduct.price * singleProduct.repeat;
    });

    const order = {
      userId: this.myCookie.getCookie('user')._id,
      products: this.myOrder,
      tax: tax,
      subtotal: subtotal,
      taxAmount: subtotal * tax / 100,
      total: subtotal + (subtotal * tax / 100)
    }

    console.log("Order: ", order)

    this.myOrders.createOrder(order)
      .subscribe(
        order => {this.myCart.showCart(), this.orderInfo = order, this.myCookie.deleteCookie('browser__settings');},
        err => console.log(err)
      );
  }
    // this.myRouter.navigate(["category"])

}
