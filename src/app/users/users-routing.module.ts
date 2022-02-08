import {
  NgModule
} from "@angular/core";
import {
  RouterModule,
  Routes
} from "@angular/router";
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

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [{
      path: 'view',
      component: ViewUsersComponent
    },
    {
      path: 'add',
      component: AddUsersComponent
    },
    {
      path: 'edit',
      component: EditUsersComponent
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule {

}
