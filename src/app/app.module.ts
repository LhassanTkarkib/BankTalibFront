import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AngularToastifyModule} from "angular-toastify";

import {ChartsModule} from "ng2-charts";

import {AuthService} from "./Services/auth.service";
import {TransactionHistoryComponent} from "./transaction-history/transaction-history.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {UserprofilecardComponent} from "./userprofilecard/userprofilecard.component";
import {AccountdetailcardComponent} from "./accountdetailcard/accountdetailcard.component";
import {TransactionLinechartComponent} from "./transaction-linechart/transaction-linechart.component";
import {MonthlyTransactionChartComponent} from "./monthly-transaction-chart/monthly-transaction-chart.component";
import {DailyTransactionPiechartComponent} from "./daily-transaction-piechart/daily-transaction-piechart.component";
import {DonwloadtransactionsComponent} from "./donwloadtransactions/donwloadtransactions.component";
import {DepositComponent} from "./deposit/deposit.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    UserprofilecardComponent,
    TransactionHistoryComponent,
    AccountdetailcardComponent,
    TransactionLinechartComponent,
    MonthlyTransactionChartComponent,
    DailyTransactionPiechartComponent,
    DonwloadtransactionsComponent,
    DepositComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularToastifyModule,
    ChartsModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
