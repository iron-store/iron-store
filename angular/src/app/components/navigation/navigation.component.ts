import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/auth.service';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user: Object = {role: ""};
  numberofItems: number;

  constructor(
    private mySession: SessionService,
    private myCookies: CookieService
  ) { }

  logOut() {
    this.mySession.logout().subscribe();
  }

  ngOnInit() {
    this.user = this.myCookies.getCookie("user");
    this.numberofItems = this.myCookies.getCookie('browser__settings').length;
  }

}
