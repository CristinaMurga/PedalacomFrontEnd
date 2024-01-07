import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './shared/services/login.service';
import { SingupService } from './shared/services/singup.service';
import { ProductDetailsService } from './shared/crudhttp/product-details.service';
import { FooterComponent } from './core/footer/footer.component';
import { CustomerAreaService } from './shared/crudhttp/customer-area.service';
import { AdminService } from './shared/crudhttp/admin.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, HttpClientModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService, SingupService, ProductDetailsService, CustomerAreaService, AdminService]
})
export class AppComponent {
  title = 'Pedalacom_Front';
}
