import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formInfo: any = {username: '', password: '', email: ''};

  user:  any;
  error: any;
  privateData: any;

  constructor (private myService: SessionService, private myRouter: Router) {}

  ngOnInit() {

  }

  login() {
    this.myService.login(this.formInfo)
      .subscribe(
        (user) => {this.user = JSON.parse(this.myService.currentUser._body), console.log(JSON.parse(this.myService.currentUser._body))},
        (err) => this.error = err
      );
  }

  logout() {
    this.myService.logout()
      .subscribe(
        () => this.user = null,
        (err) => this.error = err
      );
  }
  getPrivateData() {
    this.myService.getPrivateData()
    .subscribe(() => console.log(this.user.username),
    err => console.log(err));
  }

}
