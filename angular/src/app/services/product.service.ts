import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';


@Injectable()

export class ProductService {

    constructor(private myHttp: Http) { }

    getAllProducts() {
        return this.myHttp.get(`${environment.backendUrl}/product`)
            .map(products => products.json());
    }

    getOneProduct(id) {
        return this.myHttp.get(`${environment.backendUrl}/product/${id}`)
            .map(product => product.json());
    }

    getProductsByCategory(categoryName) {
        return this.myHttp.get(`${environment.backendUrl}/product/category-name/${categoryName}`)
            .map(products => products.json())
    }

    createProduct(newProduct) {
        return this.myHttp.post(`${environment.backendUrl}/product/new`, newProduct)
            .map(createdProduct => createdProduct.json());
    }

    deleteProduct(id) {
        return this.myHttp.post(`${environment.backendUrl}/product/delete/${id}`, {})
            .map(deletedProduct => deletedProduct.json());
    }

    updateProduct(id, updates) {
        return this.myHttp.post(`${environment.backendUrl}/product/update/${id}`, updates)
            .map(beforeUptProduct => beforeUptProduct.json());
    }

}
