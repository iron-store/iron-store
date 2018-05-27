import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {

  productSeccion: boolean = false;
  categorySeccion: boolean = false;
  newCategory: Object = { parent: null };
  newProduct: Object = {};
  subCategoriesArray: any = [];
  mainCategoriesArray: any = [];

  constructor(private myCategories: CategoryService, private myProducts: ProductService) { }

  ngOnInit() {
    this.subCategories();
    this.mainCategories();
  }

  showCategory(): void {
    this.productSeccion = false;
    this.categorySeccion = !this.categorySeccion;
  }

  showProduct(): void {
    this.categorySeccion = false;
    this.productSeccion = !this.productSeccion;
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
        newCat => console.log(newCat),
        err => console.log(err)
      )
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

  addProduct(){
    this.myProducts.createProduct(this.newProduct)
    .subscribe(
      product => console.log(product),
      err => console.log(err)
    )
  }

}
