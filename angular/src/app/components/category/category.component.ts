import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { CookieService } from '../../services/cookie.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: [Object];
  user: Object;
  updateForm: Object = { name: "" };
  category: string = "";

  constructor(
    private myCategories: CategoryService,
    private myProductsService: ProductService,
    private myCookies: CookieService,
    private myProductsComponent: ProductsComponent) { }

  ngOnInit() {
    this.showCategories();
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

  showCategories() {
    this.myCategories.getAllCategory()
      .subscribe(
        allCategories => {
          this.addChildren(allCategories),
            this.categories = allCategories
        },
        err => console.log(err)
      );
  }

  addChildren(array) {
    for (let i = 0; i < array.length; i++) {
      this.myCategories.getChildrenCategories(array[i]._id)
        .subscribe(
          children => { array[i].children = children, array[i].clicked = false; },
          err => console.log(err)
        );
    }
  }

  showSubCategories(category) {
    category.clicked = !category.clicked;
  }

  deleteCategory(categoryId: string): void {
    this.myCategories.deleteCategory(categoryId)
      .subscribe(
        deletedCategory => {
          this.deleteSubCategories(deletedCategory._id),
            this.deleteProductsByCategory(deletedCategory.name),
            this.showCategories(),
            this.myProductsService.getAllProducts();
        },
        err => console.log(err)
      )
  }

  deleteProductsByCategory(categoryName: string): void {
    this.myProductsService.getProductsByCategory(categoryName)
      .subscribe(
        products =>
          products.forEach(singleProduct =>
            this.myProductsService.deleteProduct(singleProduct._id)
              .subscribe(deletedProduct => console.log("Deleted Product: ", deletedProduct), err => console.log(err))
          ),
        err => console.log(err)
      )
  }

  deleteSubCategories(categoryId: string): void {
    this.myCategories.getChildrenCategories(categoryId)
      .subscribe(
        subCategories => {
          for (let i = 0; i < subCategories.length; i++) {
            console.log("Subcategories: ", subCategories[i]);
            this.deleteProductsByCategory(subCategories[i].name),
              this.myCategories.deleteCategory(subCategories[i]._id)
                .subscribe(
                  deleted => console.log("Deleted: ", deleted),
                  err => console.log(err)
                )
          }
          err => console.log(err)
        }
      )
  }

  updateCategory(updatedCategory) {
    this.myCategories.updateCategory(updatedCategory._id, updatedCategory)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

  passCategory(categoryName) {
    if (categoryName === "")
      this.category = ""
    else
      this.category = categoryName;
  }

}
