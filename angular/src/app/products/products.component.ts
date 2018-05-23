import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: [Object];

  constructor(private myProducts: ProductService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    this.myProducts.getAllProducts()
    .subscribe(
      products => {this.products = products, console.log("products: ", this.products)},
      err => console.log(err)
    )
  }

}
