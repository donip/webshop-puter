import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { FileSelectDirective } from 'ng2-file-upload';
import { AgmCoreModule } from '@agm/core';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
import { CategoryComponent } from './category/category.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { Globals } from './globals';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { component: MainComponent, path: 'main' },
  { component: ProfileComponent, path: 'profile' },
  { component: LoginComponent, path: 'login' },
  { component: RegisterComponent, path: 'register' },
  { component: ProductsComponent, path: 'products' },
  { component: ProductPageComponent, path: 'products/:url' },
  { component: UsersComponent, path: 'users' },
  { component: OrdersComponent, path: 'orders' },
  { component: StatisticsComponent, path: 'statistics' },
  { component: ContactComponent, path: 'contact' },
  { component: CartComponent, path: 'cart' },
  { component: CategoryComponent, path: 'category' }
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
    NavbarComponent,
    FileSelectDirective,
    ContactComponent,
    MainComponent,
    ProfileComponent,
    CartComponent,
    CategoryComponent,
    ProductPageComponent,
    FooterComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      // Hey Folks! Forget to use this malicious key. Use your own one.
      apiKey: 'AIzaSyBBUFtYxZJ-ot9ZMjQzQI-4QDq90ccEGwE'
    }),
    BrowserModule,
    HttpModule,
    FormsModule,
    Ng2GoogleChartsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CartService, NavbarComponent, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
