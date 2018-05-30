import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/auth.service';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private mySession: SessionService,
    private myCookies: CookieService
  ) { }

  user: any = { role: '' };
  numberofItems: number;

  logOut() {
    this.mySession.logout().subscribe(
      () => {},
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.myCookies.userCookie
      .subscribe(
        res => {
          this.user = res;
          if (!this.user) {
            this.user = this.myCookies.getCookie('user')
          }
          console.log("User in nav Com: ", typeof(this.user), this.user);
        }
      )

    this.myCookies.productCookie
      .subscribe(
        res => {
          this.numberofItems = res.length;
          if (!this.numberofItems) {
            this.numberofItems = this.myCookies.getCookie('browser__settings').length;
            console.log("Else if res: ", this.myCookies.getCookie('browser__settings').length);
          }
          console.log("Nav Product", this.numberofItems)
        }
      )
  }

}
