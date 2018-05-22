import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service'


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: [Object];
  children: [any];
  subCategories: [Object];

  constructor(private myCategories: CategoryService) { }

  ngOnInit() {
    this.showCategories();
  }

  showCategories(){
    this.myCategories.getAllCategory()
    .subscribe(
      allCategories => {this.categories = allCategories, console.log(this.categories)},
      err => console.log(err)
    )
  }

  showSubCategories(categoryId){
    console.log(this.children);
    this.myCategories.getChildrenCategories(categoryId)
    .subscribe(
      res => {this.subCategories = res, console.log("Categories Array: ", this.subCategories)},
      err => console.log(err)
    )
  }

}
