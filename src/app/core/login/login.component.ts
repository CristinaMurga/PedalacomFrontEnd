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
  username = '';
  isItOld= false;
  incorrectCredenzials = false;
  showMandatoryErr = false;
  showinvalidAccount = false;
  showloginBox = true; 
  showerrPwd = false;
  noUpdated = false;




  Login(userName:string, pwd: string){
    this.incorrectCredenzials = false;
  

    if(userName === '' || pwd === ''){
      this.showMandatoryErr = true;
      return
    }
    

    this.login.getCustomersEmail(userName).subscribe({
        next: (data: Customer ) =>
        {
          console.log(userName);
          this.oldCustomer = data

          //if user is old
          if(this.oldCustomer.isOld == 1){
            this.isItOld = true;
            this.showloginBox = false;
          

            //if user is not old
          }else if(this.oldCustomer.isOld == 0){
           


            this.login.RunLogin(userName,pwd).subscribe({
              next: (resp: any) => {
                console.log('resp:' + resp.status);
                if(resp.status == 200) {
                  this.login.setTokenHttpHeader(userName,pwd);
                  this.setUserLoggedIn();
                  this.redirectHome();
                  this.username = this.oldCustomer.emailAddress;
              }},
              error: (err: any) => {
                if(err.status == HttpStatusCode.BadRequest){
                  console.log('Impossibile eseguire il login');
                  this.incorrectCredenzials = true;
                  this.showinvalidAccount = false;
                  this.showMandatoryErr = false;
                }
              }
            })
            
            // if user is an admin
          }else if(this.oldCustomer.isOld == 2){
            console.log('admin')
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


  UpdateCustomer(tmpPassword: string, checkpwd: string){
    if(tmpPassword === '' || checkpwd === ''){
      this.showMandatoryErr = true;
      return;
    }
    if (checkpwd != tmpPassword) {
      this.showerrPwd= true;
      this.showMandatoryErr = false;
      return;
    }


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
      isOld : 0,
      customerAddresses:[],
      salesOrderHeaders:[]
     }

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

  setUserLoggedIn() {
    this.login.setUserLoggedIn(true);
  }

  closeupdatepwd(){
    this.isItOld = false;
    this.showloginBox = true;
  }

  redirectHome(){
    this.router.navigate(['/home']);
  }


}
