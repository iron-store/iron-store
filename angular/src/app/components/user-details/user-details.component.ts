import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../services/cookie.service';
import { SessionService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  error: any;

  theUserName: string = this.cookieService.getCookie('user').username;
  theEmail: string = this.cookieService.getCookie('user').email;
  theId: string = this.cookieService.getCookie('user')._id;

  formInfo: any = {username: '', email: ''};
  newUser: any = {username: '', email: '', _id: this.theId};


  constructor(
    private cookieService: CookieService,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
  }

  editUser() {

    if (this.formInfo.username === '' && this.formInfo.email === '') {
      return;
    }
    if (this.formInfo.username === '') {
      this.newUser.username = this.theUserName;
    }
    else {
      this.newUser.username = this.formInfo.username;
    }
    if (this.formInfo.email === '') {
      this.newUser.email = this.theEmail;
    }
    else {
      this.newUser.email = this.formInfo.email;
    }

    this.sessionService.editUser(this.newUser)
      .subscribe(
        () => {},
        err => this.error = err
      );

  }


}
