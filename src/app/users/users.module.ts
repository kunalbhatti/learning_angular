import {
  CommonModule
} from "@angular/common";
import {
  NgModule
} from "@angular/core";
import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import {
  UsersRoutingModule
} from "./users-routing.module";

import {
  AgGridModule
} from 'ag-grid-angular';

import 'ag-grid-enterprise';

import {
  AddUsersComponent
} from "./users/add-users/add-users.component";
import {
  EditUsersComponent
} from "./users/edit-users/edit-users.component";
import {
  UsersComponent
} from "./users/users.component";
import {
  ViewUsersComponent
} from "./users/view-users/view-users.component";

@NgModule({
  declarations: [UsersComponent, AddUsersComponent, ViewUsersComponent, EditUsersComponent],
  imports: [AgGridModule.withComponents([]), ReactiveFormsModule, FormsModule, CommonModule, UsersRoutingModule],
})
export class UsersModule {

}
