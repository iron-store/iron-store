import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private mySession: SessionService,
  ) { }

  logOut() {
    this.mySession.logout().subscribe();
  }

  ngOnInit() {
  }

}
