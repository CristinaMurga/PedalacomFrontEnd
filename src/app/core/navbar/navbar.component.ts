import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  showlogin = true;
  showLogged = false;
  showLogOut = false;
  isUserLoggedIn: boolean = false;
  
  userName = '';


  constructor(private login: LoginService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('NavbarComponent ngOnInit');
    this.login.isUserLoggedIn$.subscribe((value) => {
      console.log('Valore in navbar:', value);
      this.isUserLoggedIn = value;
      this.cdr.detectChanges();

      // // Verifica se isUserLoggedIn è true
    
      if (sessionStorage.getItem(this.login.tokenKey) == null) {
        this.showLogged = false;
        this.showLogOut= false;
        this.showlogin = true;
      } else {
        this.showlogin = false;
        this.showLogged = true;
        this.showLogOut = true;
      }
    });
  }

  logOut(){
    sessionStorage.clear()
    this.showLogged = false;
    this.showLogOut = false;
    this.showlogin = true;
  }


}