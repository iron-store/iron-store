import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { SessionService } from '../../services/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

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
  newProduct: any = {};
  subCategoriesArray: any = [];
  mainCategoriesArray: any = [];
  historyArray: any = [];

  myUploader = new FileUploader({
    url: environment.backendUrl + '/product/new',
    itemAlias: "photo"
  })

  theParent: string = 'This will be a Parent || Select Parent';
  theCategory: string = 'Select Category';

  theNewCatSuccessMessage: string;
  theNewProdSuccessMessage: string;
  theCatErrorMessage: string;
  theProdErrorMessage: string;

  constructor(private myCategories: CategoryService,
    private myProducts: ProductService,
    private myOrders: OrderService,
    private mySession: SessionService,
    private myRouter: Router) { }

  ngOnInit() {
    this.subCategories();
    this.mainCategories();
    this.history();
  }

  selectTheParent(theOneClicked: string) {
    this.theParent = theOneClicked;
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
    this.clearMessages();
    this.myCategories.createCategory(this.newCategory)
      .subscribe(
        newCat => {
          this.setNewCatSuccessMessage(newCat);
          console.log(newCat);
          this.subCategories();
          this.mainCategories();
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

  history() {
    this.myOrders.getAllOrders()
      .subscribe(
        orders => {
          this.historyArray = orders, this.historyArray.forEach(order => {
            this.mySession.getUserById(order.userId)
              .subscribe(
                user => {
                  order.userName = user.username;
                  order.userEmail = user.email;
                },
                err => console.log(err)
              )
          },
          )
        },
        err => console.log(err)
      )
  }

  addProduct() {
    this.clearMessages();
    const shouldContinue = this.handleNewProductValidation();
    if (!shouldContinue) {
      return;
    }
    this.myUploader.onBuildItemForm = (item, form) => {
      form.append('name', this.newProduct.name);
      form.append('price', this.newProduct.price);
      form.append('description', this.newProduct.description);
      form.append('category', this.newProduct.category);
    }
    this.myUploader.onSuccessItem = (item, response) => {
      this.theNewProdSuccessMessage = `${this.newProduct.name} was created with category: ${this.newProduct.category}`;
    }
    this.myUploader.onErrorItem = (item, response) => {
      console.log("Error on image upload", item, response);
    }
    this.myUploader.uploadAll();
  }

  handleNewProductValidation(): boolean {
    if (!this.newProduct.name) {
      console.log('You must provide a name for the new product.');
      this.theProdErrorMessage = 'You must provide a name for the new product.';
      return false;
    }
    else if (!this.newProduct.price) {
      console.log('You must provide a price for the new product.');
      this.theProdErrorMessage = 'You must provide a price for the new product.';
      return false;
    }
    else if (!this.newProduct.image) {
      console.log('You must provide an image for the new product.');
      this.theProdErrorMessage = 'You must provide an image for the new product.';
      return false;
    }
    else if (!this.newProduct.description) {
      console.log('You must provide a description for the new product.');
      this.theProdErrorMessage = 'You must provide a description for the new product.';
      return false;
    }
    else if (!this.newProduct.category) {
      console.log('You must select a category for your product.');
      this.theProdErrorMessage = 'You must select a category for your product.';
      return false;
    }
    else {
      return true;
    }
  }

  setNewCatSuccessMessage(theCategory) {

    if (theCategory.message) {
      this.theCatErrorMessage = 'You must provide a name for your new Category';
      return;
    }

    this.theNewCatSuccessMessage = `New Category created with name ${theCategory.name}. `;

    if (theCategory.parent === null) {
      this.theNewCatSuccessMessage += `It is a Parent Category.`;
    }
    else {
      this.theNewCatSuccessMessage += `Its parent Category is: ${this.theParent}`;
    }
    console.log('this.theNewCatSuccessMessage: ', this.theNewCatSuccessMessage);

  }

  clearMessages() {
    this.theCatErrorMessage = '';
    this.theProdErrorMessage = '';
    this.theNewCatSuccessMessage = '';
    this.theNewProdSuccessMessage = '';
  }

}
