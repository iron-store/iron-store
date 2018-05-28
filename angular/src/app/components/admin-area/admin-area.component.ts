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

  productSeccion: boolean = false;
  categorySeccion: boolean = false;
  userSeccion: boolean = false;
  historySeccion: boolean = false;
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
    this.userSeccion = false;
    this.productSeccion = false;
    this.historySeccion = false;
    this.categorySeccion = !this.categorySeccion;
  }

  showProduct(): void {
    this.userSeccion = false;
    this.historySeccion = false;
    this.categorySeccion = false;
    this.productSeccion = !this.productSeccion;
  }

  showUserInfo(): void {
    this.productSeccion = false;
    this.historySeccion = false;
    this.categorySeccion = false;
    this.userSeccion = !this.userSeccion;
  }

  showHistory(): void {
    this.productSeccion = false;
    this.historySeccion = !this.historySeccion;
    this.categorySeccion = false;
    this.userSeccion = false;
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
              user => { console.log("User: ", user), order.userName = user.username, order.userEmail = user.email },
              err => console.log(err)
            )
        },
        console.log(this.historyArray)
        )},
        err => console.log(err)
      )
  }

}
