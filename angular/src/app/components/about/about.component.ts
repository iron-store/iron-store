import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  responseMessage: any;

  constructor(private myHttp: Http) { }

  ngOnInit() {
  }

  resetEverything() {
    return this.myHttp.post(`${environment.backendUrl}/seeds/reset-products-and-categories`, {})
      .subscribe(response => {
        console.log('response: ', response);
        // this.responseMessage = response._body.message;
        console.log('response._body: ', response.json().message);
        this.responseMessage = response.json().message;
      });
      // .map(products => products.json());

  }

}
