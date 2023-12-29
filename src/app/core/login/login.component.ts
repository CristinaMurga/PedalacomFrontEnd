import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { HttpStatusCode } from '@angular/common/http';
import { OldCustomer } from '../../shared/modelsdata/OldCustomer';
import { Customer } from '../../shared/modelsdata/Customer';  

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private login:LoginService){}
  
 

  updatedCustomer: Customer = new Customer();
  oldCustomer : OldCustomer = new OldCustomer();

  isItOld= false;
  isModalVisible = false;
  incorrectCredenzials = false;
  userlogged = false; 



  Login(userName:string, pwd: string){
    this.incorrectCredenzials = false;
    this.userlogged = false;

    this.login.getCustomersEmail(userName).subscribe({
        next: (data: OldCustomer ) =>
        {
          console.log(userName);
          this.oldCustomer = data
          if(this.oldCustomer.isOld == 1){
            this.isItOld = true;
            this.isModalVisible = true;
            console.log('registrati di nuovo')
          }else if(this.oldCustomer.isOld == 0){
            console.log('Log in')


            this.login.RunLogin(userName,pwd).subscribe({
              next: (resp: any) => {
                console.log('resp:' + resp.status);
                if(resp.status == 200) {
                  this.login.setTokenHttpHeader(userName,pwd);
                  this.setUserLoggedIn()
              }},
              error: (err: any) => {
                if(err.status == HttpStatusCode.BadRequest){
                  console.log('Impossibile eseguire il login');
                  this.incorrectCredenzials = true;
                }
              }
            })
          }
        },
        error: (err: any) => {
            console.log("Get costumer email err:" + err);
        } 
    })
  }


  UpdateCustomer(tmpPassword: string){
    console.log(this.oldCustomer)
    this.updatedCustomer = {
      customerID: this.oldCustomer.customerID,
      nameStyle: true,
      title: 'string',
      firstName: 'string',
      middleName: 'string',
      lastName: 'string',
      suffix:'string',
      companyName: 'string',
      salesPerson: 'string',
      emailAddress: this.oldCustomer.emailAddress,
      phone: 'string',
      passwordHash: '00',
      passwordSalt: '00',
      rowguid: this.oldCustomer.rowguid,
      tmpPassword: tmpPassword,
      modifiedDate: new Date(),
      isOld : 0
     }

     console.log(this.updatedCustomer)

     this.login.SaveUpdate(this.updatedCustomer.emailAddress, this.updatedCustomer).subscribe({
      next: (data: any) => {
      alert(data.status);
        console.log(data);
        console.log('Inserimento Dipendente, avvenuto con successo!');
        console.log(data.status)
        this.closeModal();
      },
      error: (err: any) => {
        console.log(err.status);
        alert(err.status)
      },
     })
  }

  setUserLoggedIn() {
    console.log('diventa true')
    this.login.setUserLoggedIn(true);
    console.log('è diventato true?:' )
    
  }


  closeModal(){
    this.isModalVisible = false;
  }



}
