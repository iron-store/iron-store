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

  error: any;

  constructor (private myService: SessionService, private myRouter: Router) {}

  ngOnInit() {

  }

  login() {
    this.myService.login(this.formInfo)
      .subscribe(
        () => console.log("login"),
        (err) => this.error = err
      );
  }

  logout() {
    this.myService.logout()
      .subscribe(
        () => console.log("logout"),
        (err) => this.error = err
      );
  }
  getPrivateData() {
    this.myService.getPrivateData()
    .subscribe(() => console.log("private data"),
    err => console.log(err));
  }

}
