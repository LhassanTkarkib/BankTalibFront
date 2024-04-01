import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RegisterComponent} from "./register/register.component";
import {DepositComponent} from "./deposit/deposit.component";

const routes: Routes = [
  {path: '',component:DashboardComponent, pathMatch: 'full'},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'login',component:RegisterComponent},
  {path: 'deposit',component:DepositComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
