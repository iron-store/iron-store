import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: [Object];

  constructor(private myCategories: CategoryService) { }

  ngOnInit() {
    this.showCategories();
  }

  showCategories() {
    this.myCategories.getAllCategory()
    .subscribe(
      allCategories => {
        this.addChildren(allCategories);
        this.categories = allCategories;
        console.log(this.categories); },
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
    console.log(array);
  }

  showSubCategories(category) {
    category.clicked = !category.clicked;
  }

}
