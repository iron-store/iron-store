import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable ()

export class OrderService {
    constructor (private myHttp: Http) {}

    getAllOrders(){
        return this.myHttp.get('http://localhost:3000/order/')
        .map ( orders => orders.json() );
    }

    getOneOrder(id){
        return this.myHttp.get(`http://localhost:3000/order/${id}`)
        .map( order => order.json() );
    }

    createOrder(newOrder){
        return this.myHttp.post(`http://localhost:3000/order/new`, newOrder)
        .map( createdorder => createdorder.json() );
    }

    deleteOrder(id){
        return this.myHttp.post(`http://localhost:3000/order/delete/${id}`, {})
        .map( deletedorder => deletedorder.json() );
    }

    updateOrder(id, updates){
        return this.myHttp.post(`http://localhost:3000/order/update/${id}`, updates)
        .map( beforeUptorder => beforeUptorder.json() );
    }
}
