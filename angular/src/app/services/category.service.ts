import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';


@Injectable ()

export class CategoryService {

    constructor (private myHttp: Http) {}

    getAllCategory() {
        return this.myHttp.get('${environment.backendUrl}/category/')
        .map ( categories => categories.json() );
    }

    getOneCategory(id) {
        return this.myHttp.get(`${environment.backendUrl}/category/${id}`)
        .map( category => category.json() );
    }

    getChildrenCategories(id) {
        return this.myHttp.get(`${environment.backendUrl}/category/sub-categories/${id}`)
        .map( subCategories =>  subCategories.json() );
    }

    createCategory(newcategory) {
        return this.myHttp.post(`${environment.backendUrl}/category/new`, newcategory)
        .map( createdcategory => createdcategory.json() );
    }

    deleteCategory(id) {
        console.log("Service for delete this: ", id);
        return this.myHttp.post(`${environment.backendUrl}/category/delete/${id}`, {})
        .map( deletedcategory => deletedcategory.json() );
    }

    updateCategory(id, updates) {
        return this.myHttp.post(`${environment.backendUrl}/category/update/${id}`, updates)
        .map( beforeUptcategory => beforeUptcategory.json() );
    }

}
