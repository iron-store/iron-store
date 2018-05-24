import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable ()

export class ProductService {

    constructor (private myHttp: Http) {}

    getAllProducts() {
        return this.myHttp.get('http://localhost:3000/product')
        .map ( products => products.json() );
    }

    getOneProduct(id) {
        return this.myHttp.get(`http://localhost:3000/product/${id}`)
        .map( product => product.json() );
    }

    createProduct(newProduct) {
        return this.myHttp.post(`http://localhost:3000/product/new`, newProduct)
        .map( createdProduct => createdProduct.json() );
    }

    deleteProduct(id) {
        return this.myHttp.post(`http://localhost:3000/product/delete/${id}`, {})
        .map( deletedProduct => deletedProduct.json() );
    }

    updateProduct(id, updates) {
        return this.myHttp.post(`http://localhost:3000/product/update/${id}`, updates)
        .map( beforeUptProduct => beforeUptProduct.json() );
    }

}
