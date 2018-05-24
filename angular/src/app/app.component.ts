import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './services/auth.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formInfo: any = {username: '', password: '', email: ''};

  user:  any;
  error: any;
  privateData: any;

  constructor (private myService: SessionService) {}

  // login() {
  //   this.myService.login(this.formInfo)
  //     .subscribe(
  //       (user) => this.user = user,
  //       (err) => this.error = err
  //     );
  // }

  signup() {
    this.myService.signup(this.formInfo)
      .subscribe(
        (user) => {this.user = user; },
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



}
