import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  productOrder: [Object];
  order = {userId: 'skdlfwlkej3f9202', products: [], tax: 6, subtotal: 100, total: 106};

  constructor(private myOrders: OrderService) { }

  ngOnInit() {
    // this.getAllOders();
  }

  getAllOders(): void {
    this.myOrders.getAllOrders()
    .subscribe(
      orders => console.log(orders),
      err => console.log(err)
    );
  }

  addProduct(product) {
    console.log('Product: ', product);
    this.order.products.push(product);
    console.log('this is my order before create: ', this.order);
    this.newOrder(this.order);
    // this.order.products = [];
  }

  newOrder(order) {
    this.myOrders.createOrder(order)
    .subscribe(
      order => console.log(order),
      err => console.log(err)
    );
  }

}
