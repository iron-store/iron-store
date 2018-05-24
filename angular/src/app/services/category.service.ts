import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable ()

export class CategoryService {

    constructor (private myHttp: Http) {}

    getAllCategory() {
        return this.myHttp.get('http://localhost:3000/category/')
        .map ( categories => categories.json() );
    }

    getOneCategory(id) {
        return this.myHttp.get(`http://localhost:3000/category/${id}`)
        .map( category => category.json() );
    }

    getChildrenCategories(id) {
        return this.myHttp.get(`http://localhost:3000/category/sub-categories/${id}`)
        .map( subCategories => subCategories.json() );
    }

    createCategory(newcategory) {
        return this.myHttp.post(`http://localhost:3000/category/new`, newcategory)
        .map( createdcategory => createdcategory.json() );
    }

    deleteCategory(id) {
        return this.myHttp.post(`http://localhost:3000/category/delete/${id}`, {})
        .map( deletedcategory => deletedcategory.json() );
    }

    updateCategory(id, updates) {
        return this.myHttp.post(`http://localhost:3000/category/update/${id}`, updates)
        .map( beforeUptcategory => beforeUptcategory.json() );
    }

}
