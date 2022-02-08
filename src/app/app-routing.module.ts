import {
  NgModule
} from "@angular/core";
import {
  Routes,
  RouterModule
} from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },{
  path: 'users',
  loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
