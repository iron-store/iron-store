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

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {path: 'index', component: AppComponent},
  { path: 'product', component: ProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'order', component: OrderService}
]


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    LoginComponent,
    CategoryComponent,
    ProductsComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: BrowserXhr, useClass: CustExtBrowserXhr },
    SessionService, ProductService, CategoryService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
