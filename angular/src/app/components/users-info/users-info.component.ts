import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements OnInit {

  users: [Object];
  usersSeccion: boolean = true;
  userHistorySeccion: boolean = false;
  userHistoryArray: any = [];


  constructor(private mySession: SessionService, private myOrders: OrderService) { }

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

  userHistory(userId: string): void {
    this.usersSeccion = false;
    this.userHistorySeccion = !this.userHistorySeccion;
    this.myOrders.getAllUserOrders(userId)
      .subscribe(
        orders => this.userHistoryArray = orders,
        err => console.log(err)
      )
  }

}
