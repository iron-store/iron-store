import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class SessionService {

  constructor(private http: Http, private myUserCookie: CookieService) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  saveUserCookie(user) {
    this.myUserCookie.setCookie("user", user._body, 1);
  }

  deleteUserCookie() {
    this.myUserCookie.deleteCookie("user");
  }

  signup(user) {
    return this.http.post(`http://localhost:3000/signup`, user)
      .map(res => { this.saveUserCookie(res), res.json(); })
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(`http://localhost:3000/login`, user)
      .map(res => { this.saveUserCookie(res), res.json(); })
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(`http://localhost:3000/logout`, {})
      .map(res => {this.deleteUserCookie() , res.json(); })
      .catch(this.handleError);
  }

  getPrivateData() {
    return this.http.get(`http://localhost:3000/private`)
      .map(res => { console.log('Mi service: ', res), res.json(); })
      .catch(this.handleError);
  }

}
