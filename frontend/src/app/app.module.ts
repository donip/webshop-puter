import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { component: LoginComponent, path: 'login' },
  { component: RegisterComponent, path: 'register' },
  { component: ProductsComponent, path: 'products' },
  { component: UsersComponent, path: 'users' },
  { component: OrdersComponent, path: 'orders' },
  { component: StatisticsComponent, path: 'statistics' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StatisticsComponent,
    ProductsComponent,
    UsersComponent,
    OrdersComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Ng2GoogleChartsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
