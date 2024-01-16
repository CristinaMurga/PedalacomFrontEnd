import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';
import { SigninComponent } from './core/signup/signup.component';
import { CatalogueComponent } from './features/catalogue/catalogue.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { CustomersAreaComponent } from './features/customers-area/customers-area.component';   
import { AdminComponent } from './features/admin/admin.component'; 
import { CartComponent } from './features/cart/cart.component';
 
export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'log-in', component: LoginComponent},
    {path: 'sign-up', component: SigninComponent},
    {path: 'catalogue', component: CatalogueComponent},
    {path: 'product/:id', component: ProductDetailsComponent},
    {path: 'personal-area', component: CustomersAreaComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'cart', component: CartComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full' },

];