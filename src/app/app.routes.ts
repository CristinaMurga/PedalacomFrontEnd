import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { LoginComponent } from './core/login/login.component';
import { SigninComponent } from './core/signup/signup.component';
import { CatalogueComponent } from './features/catalogue/catalogue.component';
 
export const routes: Routes = [
    {path: 'products', component: ProductsComponent},
    {path: 'catalogue', component: CatalogueComponent},
    {path: 'log-in', component: LoginComponent},
    {path: 'sign-up', component: SigninComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full' }
];