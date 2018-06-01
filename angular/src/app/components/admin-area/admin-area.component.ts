import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { SessionService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {

  productSeccion: string = '';
  categorySeccion: string = 'active';
  userSeccion: string = '';
  historySeccion: string = '';
  newCategory: Object = { parent: null };
  newProduct: Object = {};
  subCategoriesArray: any = [];
  mainCategoriesArray: any = [];
  historyArray: any = [];

  constructor(private myCategories: CategoryService,
    private myProducts: ProductService,
    private myOrders: OrderService,
    private mySession: SessionService) { }

  ngOnInit() {
    this.subCategories();
    this.mainCategories();
    this.history();
  }

  showCategory(): void {
    this.userSeccion = '';
    this.productSeccion = '';
    this.historySeccion = '';
    if (this.categorySeccion === '')
      this.categorySeccion = 'active';
    else
      this.categorySeccion = '';
  }

  showProduct(): void {
    this.userSeccion = '';
    this.historySeccion = '';
    this.categorySeccion = '';
    if (this.productSeccion === '')
      this.productSeccion = 'active';
    else
      this.productSeccion = '';
  }

  showUserInfo(): void {
    this.productSeccion = '';
    this.historySeccion = '';
    this.categorySeccion = '';
    if (this.userSeccion === '')
      this.userSeccion = 'active';
    else
      this.userSeccion = '';
  }

  showHistory(): void {
    this.productSeccion = '';
    this.categorySeccion = '';
    this.userSeccion = '';
    if (this.historySeccion === '')
      this.historySeccion = 'active';
    else
      this.historySeccion = '';
  }

  subCategories() {
    this.myCategories.getAllCategory()
      .subscribe(
        categories =>
          categories.forEach(category => {
            if (!category.parent)
              this.subCategoriesArray.push(category)
          }),
        err => console.log(err)
      )
  }

  addCategory() {
    this.myCategories.createCategory(this.newCategory)
      .subscribe(
        newCat => {
          console.log(newCat);
          this.subCategories();
        },
        err => console.log(err)
      );
  }

  mainCategories() {
    this.myCategories.getAllCategory()
      .subscribe(
        categories =>
          categories.forEach(category => {
            if (category.parent)
              this.mainCategoriesArray.push(category)
          }),
        err => console.log(err)
      )
  }

  addProduct() {
    this.myProducts.createProduct(this.newProduct)
      .subscribe(
        product => console.log(product),
        err => console.log(err)
      )
  }

  history() {
    this.myOrders.getAllOrders()
      .subscribe(
        orders => {
          this.historyArray = orders, this.historyArray.forEach(order => {
            this.mySession.getUserById(order.userId)
              .subscribe(
                user => { console.log("User: ", user); order.userName = user.username; order.userEmail = user.email },
                err => console.log(err)
              )
          },
            console.log(this.historyArray)
          )
        },
        err => console.log(err)
      )
  }

}
