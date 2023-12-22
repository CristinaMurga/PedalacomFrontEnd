import { Component } from '@angular/core';
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
  styleUrl: './login.component.css',
  providers: [LoginService]
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
          console.log(this.oldCustomer);
          if(this.oldCustomer.isOld == 1){
            this.isItOld = true;
            this.isModalVisible = true;
            console.log(this.isItOld)
            console.log('registrati di nuovo')
          }else if(this.oldCustomer.isOld == 0){
            console.log(this.isItOld)
            console.log('Log in')


            this.login.RunLogin(userName,pwd).subscribe({
              next: (resp: any) => {
                console.log('resp:' + resp.status);
                if(resp.status == 200) {
                  this.login.setTokenHttpHeader(userName,pwd);
                  this.userlogged = true;
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


  UpdateCustomer(name: string , lastName: string , phone: string, tmpPassword: string){


    console.log(this.oldCustomer)
    this.updatedCustomer = {
      customerID: this.oldCustomer.customerID,
      nameStyle: true,
      title: '',
      firstName: name,
      middleName: '',
      lastName: lastName,
      suffix:'',
      companyName: '000',
      salesPerson: '',
      emailAddress: this.oldCustomer.emailAddress,
      phone: phone,
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
        console.log(data);
        console.log('Inserimento Dipendente, avvenuto con successo!');
      },
      error: (err: any) => {
        console.log(err);
      },
     })
  }

  closeModal(){
    this.isModalVisible = false;
  }



}
