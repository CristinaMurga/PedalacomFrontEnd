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
  isUserLoggedIn: boolean = false;

  constructor(private login: LoginService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('NavbarComponent ngOnInit');
    this.login.isUserLoggedIn$.subscribe((value) => {
      console.log('Valore in navbar:', value);
      this.isUserLoggedIn = value;
      this.cdr.detectChanges();
  
      // Verifica se isUserLoggedIn è true
      if (this.isUserLoggedIn) {
        console.log('isUserLoggedIn è true. Esegui azione desiderata.');
        this.showLogged = true;
        this.showlogin = false;
        // Esegui qui l'azione che desideri quando isUserLoggedIn è true
      }
    });
  }



}