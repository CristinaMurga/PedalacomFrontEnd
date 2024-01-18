import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SingupService } from '../../shared/services/singup.service';
import { Customer } from '../../shared/modelsdata/Customer';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SigninComponent {


  constructor(private ws: SingupService, private router: Router, private login: LoginService) { }
  //per messaggi di errore o successo nei forms
  errorPwd: boolean = false;
  errorMandatory: boolean = false;
  noCreated: boolean = false;
  errorMail: boolean = false;

  checkCustomer: Customer = new Customer();
  newCustomer: Customer = new Customer();

  //metodo per inserire utente nuovo
  InsertNewCustomer(name: string, lastName: string, email: string,
    phone: string, tmpPassword: string, chckPsw: string) {

    this.verifyEmail(email); // se non ci sono errori nel form verifico che l'email non sia già esistente 

    //controlli dei form
    if (name === '' || lastName == '' || email == '' || tmpPassword == '' || chckPsw == '') {
      this.errorMandatory = true;
    } else {
      if (chckPsw != tmpPassword) {
        this.errorPwd = true;
        this.errorMandatory = false;
      } else if (chckPsw == tmpPassword) {
        this.errorPwd = false;

        //inserisco dati dal form
        this.newCustomer = {
          customerID: 0,
          nameStyle: true,
          title: '',
          firstName: name,
          middleName: '',
          lastName: lastName,
          suffix: '',
          companyName: '',
          salesPerson: '',
          emailAddress: email,
          phone: phone,
          passwordHash: '00',
          passwordSalt: '00',
          rowguid: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
          tmpPassword: tmpPassword,
          modifiedDate: new Date(),
          isOld: 2,
          customerAddresses: [],
          salesOrderHeaders: []
        }
        //chiamo il metodo post del sign up service per salvare i dati 
        this.ws.PostCustomer(this.newCustomer).subscribe({
          next: (data: any) => {
            this.errorMandatory = false;
            this.errorPwd = false;
            this.redirectLogin();// si è andato tutto ok faccio redirect al login
          },
          error: (err: any) => {
            this.noCreated = true;
          },
        })
      }
    }
  }

  //mi porta alla home
  redirectLogin() {
    this.router.navigate(['/log-in']);
  }

  //verifico che l'email del utente non sia già registrata
  verifyEmail(email: string) {
    this.login.getCustomersEmail(email).subscribe({
      next: (data: Customer) => {
        this.checkCustomer = data;
        if (this.checkCustomer.customerID != 0) {
          this.errorMail = true
    
        }else{
          this.errorMail = false;
        }

      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
}
