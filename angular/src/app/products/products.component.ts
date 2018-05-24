import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CookieService } from '../services/cookie.service';

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
        products => { this.products = products, console.log("products: ", this.products) },
        err => console.log(err)
      )
  }

  addCookie(product: any): void {
    if (!this.myCookies.getCookie("browser__settings")) {
      product.repeat = 1;
      this.myCookies.setCookie("browser__settings", JSON.stringify([product]), 1)
      console.log(this.myCookies.getCookie("browser__settings"));
    }

    else{
      const newCookieValue = JSON.parse(this.myCookies.getCookie("browser__settings"));
      for (let i = 0; i < newCookieValue.length; i++){
        if ( product._id === newCookieValue[i]._id ){
          newCookieValue[i].repeat++;
          this.myCookies.setCookie("browser__settings", JSON.stringify(newCookieValue), 1);
          console.log(this.myCookies.getCookie("browser__settings"));
          return;
        }
      }
      product.repeat = 1;
      newCookieValue.push(product);
      this.myCookies.setCookie("browser__settings", JSON.stringify(newCookieValue), 1) ;
      console.log(this.myCookies.getCookie("browser__settings"));
    }
  }

}
