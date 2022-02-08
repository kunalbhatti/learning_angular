import {
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import {
  Subscription
} from "rxjs";
import {
  UsersService
} from "src/app/services/users.service";

import {
  User
} from '../../../models/user.model';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit, OnDestroy {

  users: User[] = [];

  selectedUser: number = -1;

  usersSub!: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
    this.usersSub = this.usersService.usersArr.subscribe(
      (users: User[]) => {
        this.users = users;
        this.selectedUser = -1;
      }
    );
  }

  onDelete(id: number): void {
    this.usersService.deleteUser(id);
  }

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
  }

}
