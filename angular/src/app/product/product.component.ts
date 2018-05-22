import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../services/auth.service'
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor (private myService: SessionService, private myRouter: Router) {}

  ngOnInit() {
    this.myService.getPrivateData()
    .subscribe(() => {console.log("Hi sandra, I'm different!!!!!", JSON.parse(this.myService.currentUser._body).username)},
    err => console.log(err))
    // .then(user => console.log("====================", user))
    // .catch( err => { console.log("some error: ",err)
 
  }

}
