import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  history: [any];

  username = this.myCookies.getCookie('user').username;

  constructor(private myOrder: OrderService, private myCookies: CookieService) { }

  ngOnInit() {
    this.getFullHistory();
  }

  getFullHistory() {
    this.myOrder.getAllUserOrders(this.myCookies.getCookie('user')._id)
      .subscribe(
        orders => {this.history = orders, console.log(this.history); },
        err => console.log(err)
      );
  }

}
