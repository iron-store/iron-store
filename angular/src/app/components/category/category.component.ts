import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: [Object];


  constructor(
    private myCategories: CategoryService,
    private myProductsService: ProductService) { }

  ngOnInit() {
    this.showCategories();
  }

  showCategories() {
    this.myCategories.getAllCategory()
      .subscribe(
        allCategories => {
          this.addChildren(allCategories),
            this.categories = allCategories,
            console.log('Categories: ', this.categories);
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

}
