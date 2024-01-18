import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, Route } from '@angular/router';
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
  isAdminLogged: boolean = false;
  
  userName: any;


  constructor(private login: LoginService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
  
    this.login.isUserLoggedIn$.subscribe((value) => {
      this.isUserLoggedIn = value;
      this.cdr.detectChanges();

      if(sessionStorage.getItem(this.login.userName) == 'admin@admin.com'){

        this.isAdminLogged = true;
        this.showLogOut = true;
        this.showlogin = false;
        this.showLogged = false;
        this.userName = sessionStorage.getItem(this.login.userName)

      } else if (sessionStorage.getItem(this.login.tokenKey) == null) {       // // Verifica se isUserLoggedIn è true
        this.showLogged = false;
        this.showLogOut= false;
        this.showlogin = true;
        this.isAdminLogged = false;
      } else {
        this.showlogin = false;
        this.showLogged = true;
        this.showLogOut = true;
        this.isAdminLogged = false;
        this.userName = sessionStorage.getItem(this.login.userName)
      }
    });
  }

  logOut(){
    sessionStorage.clear()
    this.showLogged = false;
    this.showLogOut = false;
    this.showlogin = true;
    this.isAdminLogged = false;
    this.router.navigate(['/home'])

  }


}