import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements OnInit {

  p: number = 1;

  theUserName: string;
  theEmail: string;


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
        users => { this.users = users; },
        err => console.log(err)
      )
  }

  deleteUser(userId: string): void {
    this.mySession.deleteUser(userId)
      .subscribe(
        deletedUser => console.log(deletedUser),
        err => console.log(err)
      )
    this.showAllUsers();
  }

  userHistory(userId: string): void {
    this.usersSeccion = false;
    this.userHistorySeccion = true;
    this.myOrders.getAllUserOrders(userId)
      .subscribe(
        orders => this.userHistoryArray = orders,
        err => console.log(err)
      )
  }

  setUserInfo(aUserName, anEmail): void {
    this.theUserName = aUserName;
    this.theEmail = anEmail;
  }

  backToUsersSection() {
    this.usersSeccion = true;
    this.userHistorySeccion = false;

  }

}
