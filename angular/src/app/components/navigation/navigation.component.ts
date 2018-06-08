import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/auth.service';
import { CookieService } from '../../services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user: any;
  numberofItems: number;

  constructor(
    private mySession: SessionService,
    private myCookies: CookieService,
    private router: Router,
  ) { }

  logOut() {
    this.mySession.logout().subscribe();
  }

  goHome() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.myCookies.productsCookie
      .subscribe(
        res => {
          if (!Array.isArray(res)) {
            let cookie = this.myCookies.getCookie('browser__settings');
            let count = 0;
            if (cookie) {
              cookie.forEach(prod => {
                count += parseInt(prod.repeat);
              })
            }
            this.numberofItems = count;
          }
          else {
            let count = 0;
            res.forEach(prod => {
              count += parseInt(prod.repeat);
            })
            this.numberofItems = count;
          }
        },
        err => console.log(err)
      )

    this.myCookies.userCookie
      .subscribe(
        res => {
          if (!res.username) {
            this.user = this.myCookies.getCookie("user");
          }
          else {
            this.user = res;
          }
        },
        err => console.log(err)
      );
  }

}
