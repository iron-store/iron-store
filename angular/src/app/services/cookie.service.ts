import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CookieService {

  userCookie: BehaviorSubject<any> = new BehaviorSubject({});
  productCookie: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() { }

  public getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return JSON.parse(c.substring(cookieName.length, c.length));
      }
    }
    return '';
  }

  public deleteCookie(name) {
    if (name === 'user')
      this.userCookie.next({});
    else
      this.productCookie.next({});
    this.setCookie(name, '', -1);
  }

  public setCookie(name: string, value: any, expireDays: number, path: string = '') {
    if (name === 'user')
      this.userCookie.next(value);
    
    if ( name === 'browser__settings')
    this.productCookie.next(value);

    // console.log("User in service: ", this.userCookie);
    // console.log("Products in service: ",this.productCookie);

    if (typeof (value) !== "string")
      value = JSON.stringify(value);
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + (path.length > 0 ? '; path=' + path : '');
  }

}
