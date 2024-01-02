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
  constructor(private login:LoginService, private router:Router){}
  
 

  updatedCustomer: Customer = new Customer();
  oldCustomer : Customer = new Customer();

  isItOld= false;
  isModalVisible = false;
  incorrectCredenzials = false;
  userlogged = false; 



  Login(userName:string, pwd: string){
    this.incorrectCredenzials = false;
    this.userlogged = false;

    this.login.getCustomersEmail(userName).subscribe({
        next: (data: Customer ) =>
        {
          console.log(userName);
          this.oldCustomer = data
          console.log(this.oldCustomer)
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
                  this.setUserLoggedIn();
                  this.redirectHome();
                
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
      isOld : 0
     }

     this.login.SaveUpdate(this.updatedCustomer.emailAddress, this.updatedCustomer).subscribe({
      next: (data: any) => {
      alert(data.status);
        this.closeModal();
      },
      error: (err: any) => {
        console.log(err.status);
      },
     })
  }

  setUserLoggedIn() {
    this.login.setUserLoggedIn(true);
  }

  closeModal(){
    this.isModalVisible = false;
  }

  redirectHome(){
    this.router.navigate(['/home']);
  }


}
