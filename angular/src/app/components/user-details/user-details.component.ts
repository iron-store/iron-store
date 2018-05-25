import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../services/cookie.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  theUserName: string = '';
  theEmail: string = '';
  formInfo: any = {username: '', email: ''};
  error: any;
  newUserName: string;
  newEmail: string;


  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.theUserName = this.cookieService.getCookie('user').username;
    this.theEmail = this.cookieService.getCookie('user').email;
  }

  editUser() {
    console.log('editusercalled');
    if (this.formInfo.username === '') {
      this.newUserName = this.theUserName;
      console.log('noname');
    }
    else {
      this.newUserName = this.formInfo.username;
      console.log('this.newUserName: ', this.newUserName);
    }
    if (this.formInfo.email === '') {
      this.newEmail = this.theEmail;
      console.log('noemail');
    }
    else {
      this.newEmail = this.formInfo.email;
      console.log('this.newEmail: ', this.newEmail);
    }


  }


}
