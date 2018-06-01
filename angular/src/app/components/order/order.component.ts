import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CookieService } from '../../services/cookie.service';
import { SessionService } from '../../services/auth.service';
import { CartComponent } from '../cart/cart.component';
import { ProductService } from '../../services/product.service';
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
  subtotal: number;
  totalAmount: number;
  taxAmount: number;
  tax: number = 6;

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

  calTotalandSubtotal() {
    this.ngOnInit();
    let localSubTotal = 0;
    const tax = 6;
    this.myOrder.forEach(singleProduct => {
      localSubTotal += singleProduct.price * singleProduct.repeat;
    });
    let taxAmount = localSubTotal * (tax / 100);
    let localTotal = localSubTotal + taxAmount;
    this.subtotal = localSubTotal;
    this.taxAmount = taxAmount;
    this.totalAmount = localTotal;
  }

  newOrder() {

    const order = {
      userId: this.myCookie.getCookie('user')._id,
      products: this.myOrder,
      tax: this.tax,
      subtotal: this.subtotal,
      taxAmount: this.taxAmount,
      total: this.totalAmount
    }

    this.myOrders.createOrder(order)
      .subscribe(
        order => { this.myCart.showCart(), this.orderInfo = order, this.myCookie.deleteCookie('browser__settings'); },
        err => console.log(err)
      );
  }

}
