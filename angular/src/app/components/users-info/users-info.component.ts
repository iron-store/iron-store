import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/auth.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements OnInit {

  users: [Object];

  constructor(private mySession: SessionService) { }

  ngOnInit() {
    this.showAllUsers();
  }

  showAllUsers() {
    this.mySession.getAllUsers()
      .subscribe(
        users => { this.users = users, console.log(console.log("showAllUsers: ", users)) },
        err => console.log(err)
      )
  }

  deleteUser(userId: string): void {
    console.log("User Id: ", userId);
    this.mySession.deleteUser(userId)
      .subscribe(
        deletedUser => console.log(deletedUser),
        err => console.log(err)
      )
    this.showAllUsers();
  }

}
