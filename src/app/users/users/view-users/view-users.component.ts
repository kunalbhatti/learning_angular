import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  AgGridAngular
} from "ag-grid-angular";
import {
  ColDef
} from "ag-grid-community";
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

  @Input() selectedUser: number = -1;

  usersSub!: Subscription;

  @ViewChild('agGrid') agGrid!: AgGridAngular;

  colDef: ColDef[] = [{
    headerName: 'Name',
    field: 'name',
    sortable: true,
    checkboxSelection: true
  }, {
    headerName: 'Email',
    field: 'email'
  }, {
    headerName: 'Country',
    field: 'country',
    sortable: true,
    filter: true
  }, {
    headerName: 'State',
    field: 'state',
    sortable: true,
    filter: true
  }, {
    headerName: 'City',
    field: 'city',
    sortable: true,
    filter: true
  }, {
    headerName: 'Favourite Food',
    field: 'favFood',
  }, {
    headerName: 'Gender',
    field: 'gender'
  }, {
    headerName: 'Marital Status',
    field: 'maritalStatus'
  }];

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

  setSelectedUser(): void {

    const selectedNode = this.agGrid.api.getSelectedNodes();
    const data: User[] = selectedNode.map(node => node.data);
    
    this.selectedUser = this.users.findIndex(user => user.name === data[0].name)
    
  }

}
