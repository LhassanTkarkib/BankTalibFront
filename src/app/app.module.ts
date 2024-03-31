import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AngularToastifyModule} from "angular-toastify";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserprofilecardComponent } from './userprofilecard/userprofilecard.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AccountdetailcardComponent } from './accountdetailcard/accountdetailcard.component';
import { TransactionLinechartComponent } from './transaction-linechart/transaction-linechart.component';
import {ChartsModule} from "ng2-charts";
import { MonthlyTransactionChartComponent } from './monthly-transaction-chart/monthly-transaction-chart.component';
import { DailyTransactionPiechartComponent } from './daily-transaction-piechart/daily-transaction-piechart.component';
import { DonwloadtransactionsComponent } from './donwloadtransactions/donwloadtransactions.component';
import { DepositComponent } from './deposit/deposit.component';
import { RegisterComponent } from './register/register.component';
import { EnvironmentsModule } from './environments.module';
import { EnvironmentModule } from '../environment/environment.module';

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
    RegisterComponent
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
    EnvironmentsModule,
    EnvironmentModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
