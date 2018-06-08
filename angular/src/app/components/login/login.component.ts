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

  formInfo: any = {password: '', email: ''};

  error: string;

  constructor (private myService: SessionService, private myRouter: Router) {}

  ngOnInit() {

  }

  login() {
    const shouldContinue: boolean = this.validateLoginForm();
    if (!shouldContinue) {
      return;
    }
    this.myService.login(this.formInfo)
      .subscribe(
        () => {
          this.myRouter.navigate(['/home']);
        },
        (err) => {
          this.error = 'Wrong credentials.';
        }
      );
  }

  logout() {
    this.myService.logout()
      .subscribe(
        () => console.log('logout'),
        (err) => console.log(err)
      );
  }


  validateLoginForm(): boolean {
    if (this.formInfo.email === '') {
      this.error = 'You must provide an email.';
      return false;
    }
    else if (this.formInfo.password === '') {
      this.error = 'You must enter a password.';
      return false;
    }
    else {
      return true;
    }
  }

  getPrivateData() {
    this.myService.getPrivateData()
    .subscribe(() => console.log('private data'),
    err => console.log(err));
  }

}
