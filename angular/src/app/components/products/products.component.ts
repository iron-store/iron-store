import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: [Object];

  constructor(private myProducts: ProductService, private myCookies: CookieService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.myProducts.getAllProducts()
      .subscribe(
        products => { this.products = products, console.log('products: ', this.products); },
        err => console.log(err)
      );
  }

  addCookie(product: Object): void {
    if (!this.myCookies.getCookie('browser__settings')) {
      this.myCookies.setCookie('browser__settings', JSON.stringify([product]), 1);
      console.log(this.myCookies.getCookie('browser__settings'));
    }

    else {
      const newCookieValue = JSON.parse(this.myCookies.getCookie('browser__settings'));
      newCookieValue.push(product);
      this.myCookies.setCookie('browser__settings', JSON.stringify(newCookieValue), 1) ;
      console.log(this.myCookies.getCookie('browser__settings'));
    }
  }

}
