import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationUserComponent } from './components/information-user/information-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user/list', component: ListUsersComponent },
  { path: 'user/info/:id', component: InformationUserComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InformationUserComponent, ListUsersComponent]