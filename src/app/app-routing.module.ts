import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "./guards/auth.service";
import {RegisterComponent} from "./register/register.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {DepositComponent} from "./deposit/deposit.component";
import {ProfileComponent} from "./profile/profile.component";
import {WithdrawComponent} from "./withdraw/withdraw.component";
import {FundTransferComponent} from "./fund-transfer/fund-transfer.component";
import {TransactionHistoryComponent} from "./transaction-history/transaction-history.component";
import {BillsBoardComponent} from "./bills-board/bills-board.component";

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: DashboardComponent,canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'deposit', component: DepositComponent, canActivate: [AuthGuard]},
  {path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard]},
  {path: 'transfer', component: FundTransferComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path:'transacitonHistory',component:TransactionHistoryComponent,canActivate:[AuthGuard]},
  {path:'Bills',component:BillsBoardComponent,canActivate:[AuthGuard]}
  ]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
