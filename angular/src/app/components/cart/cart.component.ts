import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: any;

  constructor(private myCookie: CookieService) { }

  ngOnInit() {
    this.showCart();
  }

  showCart(): void {
    if (this.myCookie.getCookie('browser__settings')) {
      this.cartProducts = this.myCookie.getCookie('browser__settings');
    }
  }

}
