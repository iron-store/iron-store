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
import { LoginComponent } from './components/login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderComponent } from './components/order/order.component';
import { CartComponent } from './components/cart/cart.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { AdminAreaComponent } from './components/admin-area/admin-area.component';
import { NavigationComponent } from './components/navigation/navigation.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {path: 'index', component: AppComponent},
  { path: 'product', component: ProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'order', component: OrderComponent},
  { path: 'cart', component: CartComponent}
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
    NavigationComponent
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
