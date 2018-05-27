import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CookieService } from '../../services/cookie.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: [Object];
  user: Object;
  modalInfo: Object = {};
  updateInfo: Object = {};
  updateCategoryInfo: Object = {};

  constructor(
    private myProducts: ProductService,
    private myCookies: CookieService,
    private myCategories: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
    if (!this.myCookies.getCookie("user"))
      this.router.navigate(["login"]);
    this.user = this.myCookies.getCookie("user");
  }

  getAllProducts(): void {
    this.myProducts.getAllProducts()
      .subscribe(
        products => { this.products = products; },
        err => console.log(err)
      );
  }

  addCookie(product: any): void {
    if (!this.myCookies.getCookie('browser__settings')) {
      product.repeat = 1;
      this.myCookies.setCookie('browser__settings', [product], 1)
    }

    else {
      const newCookieValue = this.myCookies.getCookie('browser__settings');
      for (let i = 0; i < newCookieValue.length; i++) {
        if (product._id === newCookieValue[i]._id) {
          newCookieValue[i].repeat++;
          this.myCookies.setCookie('browser__settings', newCookieValue, 1);
          return;
        }
      }
      product.repeat = 1;
      newCookieValue.push(product);
      this.myCookies.setCookie('browser__settings', newCookieValue, 1);
      console.log(this.myCookies.getCookie('browser__settings'));
    }
  }

  deleteProduct(productId: string): void {
    this.myProducts.deleteProduct(productId)
      .subscribe(
        deletedProduct => this.getAllProducts(),
        err => console.log(err)
      )
  }

  updateProduct(productId: string): void {
    this.myProducts.updateProduct(productId, this.updateInfo)
      .subscribe(
        res => { this.getAllProducts(), this.modalInfo = {} },
        err => console.log(err)
      )
  }

  fillForm(productId: string): void {
    this.myProducts.getOneProduct(productId)
      .subscribe(
        product => this.modalInfo = product,
        err => console.log(err)
      )
  }

  deleteCategory(categoryId: string): void {
    this.myCategories.deleteCategory(categoryId)
      .subscribe(
        deletedCategory => {this.deleteProductsByCategory(deletedCategory.name), this.getAllProducts},
        err => console.log(err)
      )
  }

  deleteProductsByCategory(categoryName: string): void {
    this.myProducts.getOneProduct(categoryName)
      .subscribe(
        products => {
          products.forEach(singleProduct => {
            this.myProducts.deleteProduct(singleProduct._id)
          })
        },
        err => console.log(err)
      )
  }

}
