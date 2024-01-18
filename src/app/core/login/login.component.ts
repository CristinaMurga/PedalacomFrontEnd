import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { HttpStatusCode } from '@angular/common/http';
import { OldCustomer } from '../../shared/modelsdata/OldCustomer';
import { Customer } from '../../shared/modelsdata/Customer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private login: LoginService, private router: Router) { }

  updatedCustomer: Customer = new Customer();
  oldCustomer: Customer = new Customer();

  // controllo se l'utente è old
  isItOld = false;

  //per messaggi di errore o successo nei forms
  incorrectCredenzials = false;
  showMandatoryErr = false;
  showinvalidAccount = false;
  showloginBox = true;
  showerrPwd = false;
  noUpdated = false;


  //metodo che dei controlli e se si verificano le condizione fa il login

  Login(userName: string, pwd: string) {
    this.incorrectCredenzials = false;

    //controllo sul form
    if (userName === '' || pwd === '') {
      this.showMandatoryErr = true;
      return
    }
    //ricupero l'email clienti dal data base
    this.login.getCustomersEmail(userName).subscribe({
      next: (data: Customer) => {

        this.oldCustomer = data

        //if user is old = 1
        if (this.oldCustomer.isOld == 1) {
          this.isItOld = true;
          this.showloginBox = false;
          this.showMandatoryErr = false;
          this.showinvalidAccount = false;
          this.incorrectCredenzials = false


          //if user is not old = 0 oppure è admin = 2 :
        } else if (this.oldCustomer.isOld == 0 || this.oldCustomer.isOld == 2) {


          //eseguo il login
          this.login.RunLogin(userName, pwd).subscribe({
            next: (resp: any) => {

              if (resp.status == 200) {
                this.login.setTokenHttpHeader(userName, pwd);
                this.setUserLoggedIn(); //se tutto ok durante il login chiamo metodo per settare true loggedIN
                this.redirectHome();//se tutto ok durante il login faccio redirect a la home
             
              }
            },
            error: (err: any) => {
              if (err.status == HttpStatusCode.BadRequest) {
                this.incorrectCredenzials = true;
                this.showinvalidAccount = false;
                this.showMandatoryErr = false;
              }
            }
          })
        }
      },
      error: (err: any) => {
        this.showinvalidAccount = true;
        this.incorrectCredenzials = false;
        this.showMandatoryErr = false;
      }
    })
  }

  //metodo per aggiornare la password del utente old.
  UpdateCustomer(tmpPassword: string, checkpwd: string) {

    //verifico che le password coincidado e i campi non siano vuoti
    if (tmpPassword === '' || checkpwd === '') {
      this.showMandatoryErr = true;
      this.showerrPwd = false;
      return;
    }
    if (checkpwd != tmpPassword) {
      this.showerrPwd = true;
      this.showMandatoryErr = false;
      return;
    }

    //aggiorno i dati del customer
    this.updatedCustomer = {
      customerID: this.oldCustomer.customerID,
      nameStyle: this.oldCustomer.nameStyle,
      title: this.oldCustomer.title,
      firstName: this.oldCustomer.firstName,
      middleName: this.oldCustomer.middleName,
      lastName: this.oldCustomer.lastName,
      suffix: this.oldCustomer.suffix,
      companyName: this.oldCustomer.companyName,
      salesPerson: this.oldCustomer.salesPerson,
      emailAddress: this.oldCustomer.emailAddress,
      phone: this.oldCustomer.phone,
      passwordHash: '00',
      passwordSalt: '00',
      rowguid: this.oldCustomer.rowguid,
      tmpPassword: tmpPassword,
      modifiedDate: new Date(),
      isOld: 0,
      customerAddresses: [],
      salesOrderHeaders: []
    }
    //salvo i dati

    this.login.SaveUpdate(this.updatedCustomer.emailAddress, this.updatedCustomer).subscribe({
      next: (data: any) => {
        this.showloginBox = true;
        this.isItOld = false;
      },
      error: (err: any) => {
        this.noUpdated = true;
      },
    })
  }

  //paso al login service il valore true quando l'utente è loggato per cambiare lo stato della navbar
  setUserLoggedIn() {
    this.login.setUserLoggedIn(true);
  }

  //chiudo form per modifica della password
  closeupdatepwd() {
    this.isItOld = false;
    this.showloginBox = true;
  }

  //mi porta alla home
  redirectHome() {
    this.router.navigate(['/home']);
  }


}
