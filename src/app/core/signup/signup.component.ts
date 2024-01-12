import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SingupService } from '../../shared/services/singup.service';
import { Customer } from '../../shared/modelsdata/Customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SigninComponent {

  errorPwd: boolean = false;
  errorMandatory: boolean = false;
  noCreated: boolean = false;

  newCustomer: Customer = new Customer();

  constructor(private ws: SingupService, private router: Router) { }

  InsertNewCustomer(name: string, lastName: string, email: string,
    phone: string, tmpPassword: string, chckPsw: string) {
      console.log(chckPsw);
    if(name === ''|| lastName == '' || email == '' || tmpPassword == '' || chckPsw == '' ){
      this.errorMandatory = true;
    } else{
      if (chckPsw != tmpPassword) {
        this.errorPwd = true;
        this.errorMandatory = false;
      } else if(chckPsw == tmpPassword){
       
        this.errorPwd= false;
  
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
  
        console.log(this.newCustomer)
  
  
        this.ws.PostCustomer(this.newCustomer).subscribe({
          next: (data: any) => {
            this.errorMandatory= false;
            this.errorPwd = false;
            this.redirectLogin();
            
          },
          error: (err: any) => {
           this.noCreated = true;
          },
        })
      }

    }
  }

  redirectLogin(){
    this.router.navigate(['/log-in']);
  }
}
