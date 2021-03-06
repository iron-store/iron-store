import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: any;
  orderInfo: Object;

  constructor(private myCookie: CookieService) { }

  ngOnInit() {
    this.createOrderInfo();
    this.showCart();
  }

  showCart(): void {
    if (this.myCookie.getCookie('browser__settings')) {
      this.cartProducts = this.myCookie.getCookie('browser__settings');
    }
  }

  deleteProduct(productName: string): void {
    let cookie = this.myCookie.getCookie('browser__settings')
    for (let i = 0; i < cookie.length; i++) {
      if (cookie[i].name === productName) {
        cookie.splice(i, 1);
        this.myCookie.setCookie('browser__settings', cookie, 1);
        break;
      }
    }
    this.createOrderInfo();
    this.showCart();
  }

  updateCount(info: any): void {
    let cookie = this.myCookie.getCookie('browser__settings')
    for (let i = 0; i < cookie.length; i++) {
      if (cookie[i].name === info.name) {
        cookie[i].repeat = info.count;
        this.myCookie.setCookie('browser__settings', cookie, 1);
        break;
      }
    }
    this.ngOnInit();
  }

  createOrderInfo() {
    let cookie = this.myCookie.getCookie('browser__settings');
    if (cookie) {

      let subtotal = 0;
      let tax = 6;
      let taxAmount = 0;
      let total = 0;

      cookie.forEach(product => {
        subtotal += product.price * product.repeat;
      });
      taxAmount = subtotal * tax / 100;
      total = subtotal + taxAmount;

      this.orderInfo = { subtotal, tax, taxAmount, total };
    }
  }

}
