import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formInfo: any = {username: '', password: '', email: ''};

  error: any;

  constructor (private myService: SessionService, private myRouter: Router) {}

  ngOnInit() {

  }

  signUp() {
    const shouldContinue: boolean = this.validateSignupForm();
    if (!shouldContinue) {
      return;
    }
    this.myService.signup(this.formInfo)
      .subscribe(
        () => {
          this.myRouter.navigate(['/home']);
        },
        (err) => this.error = err
      );
  }




  validateSignupForm(): boolean {
    if (this.formInfo.username === '') {
      this.error = 'You must provide an user name.';
      return false;
    }
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



}
