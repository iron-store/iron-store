import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';


@Injectable ()

export class OrderService {

    constructor (private myHttp: Http) {}

    getAllOrders() {
        console.log("Orders services")
        return this.myHttp.get(`${environment.backendUrl}/order`)
        .map ( orders => orders.json() );
    }

    getAllUserOrders(userId) {
        return this.myHttp.get(`${environment.backendUrl}/order/user/${userId}`)
        .map ( orders => orders.json() );
    }

    getOneOrder(id) {
        return this.myHttp.get(`${environment.backendUrl}/order/${id}`)
        .map( order => order.json() );
    }

    createOrder(newOrder) {
        return this.myHttp.post(`${environment.backendUrl}/order/new`, newOrder)
        .map( createdorder => createdorder.json() );
    }

    deleteOrder(id) {
        return this.myHttp.post(`${environment.backendUrl}/order/delete/${id}`, {})
        .map( deletedorder => deletedorder.json() );
    }

    updateOrder(id, updates) {
        return this.myHttp.post(`${environment.backendUrl}/order/update/${id}`, updates)
        .map( beforeUptorder => beforeUptorder.json() );
    }

}
