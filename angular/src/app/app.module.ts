import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserXhr } from '@angular/http';
import { CustExtBrowserXhr } from './cust-ext-browser-xhr';

import { SessionService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { CookieService } from './services/cookie.service';

import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderComponent } from './components/order/order.component';
import { CartComponent } from './components/cart/cart.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { AdminAreaComponent } from './components/admin-area/admin-area.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { UsersInfoComponent } from './components/users-info/users-info.component';

// may need to delete
import { PaypallButtonsComponent } from './components/paypall-buttons/paypall-buttons.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'index', component: AppComponent},
  { path: 'product', component: ProductComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'cart', component: CartComponent},
  { path: 'user', component: UserDetailsComponent},
  { path: 'history', component: PurchaseHistoryComponent},
  { path: 'admin', component: AdminAreaComponent},
  { path: 'navigation', component: NavigationComponent},
  // may need to delete
  { path: 'paypall-buttons', component: PaypallButtonsComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    LoginComponent,
    CategoryComponent,
    ProductsComponent,
    OrderComponent,
    CartComponent,
    UserDetailsComponent,
    PurchaseHistoryComponent,
    AdminAreaComponent,
    NavigationComponent,
    HomeComponent,
    PaypallButtonsComponent,
    UsersInfoComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: BrowserXhr, useClass: CustExtBrowserXhr },
    SessionService,
    ProductService,
    CategoryService,
    OrderService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
