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
    this.myService.signup(this.formInfo)
      .subscribe(
        () => console.log('login'),
        (err) => this.error = err
      );
  }

}
