import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { SessionService } from '../../services/auth.service';
import { CookieService } from '../../services/cookie.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  p: number = 1;
  products: [Object];
  user: Object;
  modalInfo: Object = {};
  updateInfo: any = {};
  updateCategoryInfo: Object = {};
  filter: string;
  productInfoForModal: Object = { name: "", price: 0, picturePath: "", description: "" };
  @Input() categoryFromParent: string = "";

  myUploader = new FileUploader({
    url: environment.backendUrl + '/product/new',
    itemAlias: "photo"
  })

  constructor(
    private myProducts: ProductService,
    private myCookies: CookieService,
    private myCategories: CategoryService,
    private router: Router,
    private http: Http,
    private mySession: SessionService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.myCookies.userCookie
      .subscribe(
        res => {
          if (!res.username) {
            this.user = this.myCookies.getCookie("user");
          }
          else {
            this.user = res;
          }
        },
        err => console.log(err)
      )
  }

  getProducts(): void {
    this.myProducts.getAllProducts()
      .subscribe(
        products => { this.products = products; },
        err => console.log(err)
      );
  }

  addCookie(passProduct: any): void {
    // browser__setttings??? You must think you're so cute

    let product = Object.assign({}, passProduct);
    delete product.picturePath;
    delete product.updated_at;
    delete product.created_at;
    delete product.__v;
    if (!this.myCookies.getCookie('browser__settings')) {
      product.repeat = 1;
      this.myCookies.setCookie('browser__settings', [product], 1)
    }

    else {
      let newCookieValue = this.myCookies.getCookie('browser__settings');
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
      this.getProducts()
      console.log(this.myCookies.getCookie('browser__settings'));

    }
  }

  deleteProduct(productId: string): void {
    this.myProducts.deleteProduct(productId)
      .subscribe(
        deletedProduct => this.getProducts(),
        err => console.log(err)
      )
  }

  updateProduct(productId: string): void {
    this.myUploader.onBuildItemForm = (item, form) => {
      form.append('name', this.updateInfo.name);
      form.append('price', this.updateInfo.price);
      form.append('description', this.updateInfo.description);
      form.append('category', this.updateInfo.category);
    }
    this.myUploader.onSuccessItem = (item, response) => {
      console.log("Item in addProduct: ", item);
      this.router.navigate(["/category"]);
      this.getProducts();
      this.modalInfo = {};
    }
    this.myUploader.onErrorItem = (item, response) => {
      console.log("Error on image upload", item, response);
    }
    this.myUploader.uploadAll();


    // this.myProducts.updateProduct(productId, this.updateInfo)
    //   .subscribe(
    //     res => { this.getProducts(), this.modalInfo = {} },
    //     err => console.log(err)
    //   )
  }

  fillForm(product: Object): void {
    this.modalInfo = product;
  }

  singleProductView(product: Object) {
    this.productInfoForModal = product;
    console.log(this.productInfoForModal);
  }
}
