import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CookieService } from '../../services/cookie.service';
import { SessionService } from '../../services/auth.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private myOrders: OrderService,
    private myCookie: CookieService,
    private mySession: SessionService,
    private myCart: CartComponent
  ) { }

  ngOnInit() {
    if (this.myCookie.getCookie('user')) {
      console.log(this.myCookie.getCookie('user'));
    }
  }

  newOrder() {
    const products = this.myCookie.getCookie('browser__settings');
    let subtotal = 0;
    let tax = 6;

    products.forEach( singleProduct => {
      subtotal += singleProduct.price * singleProduct.repeat;
    });

    const order = {
      userId: this.myCookie.getCookie('user')._id,
      products: products,
      tax: tax,
      subtotal: subtotal,
      taxAmount: subtotal * tax / 100,
      total: subtotal + (subtotal * tax / 100)
    }

    this.myOrders.createOrder(order)
      .subscribe(
        order => this.myCart.showCart(),
        err => console.log(err)
      );

    this.myCookie.deleteCookie('browser__settings');
  }

}
