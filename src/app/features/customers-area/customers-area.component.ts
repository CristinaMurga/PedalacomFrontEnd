import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAreaService } from '../../shared/crudhttp/customer-area.service';
import { Customer } from '../../shared/modelsdata/Customer';
@Component({
  selector: 'app-customers-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers-area.component.html',
  styleUrl: './customers-area.component.css'
})
export class CustomersAreaComponent {
  constructor(private ws: CustomerAreaService){}
  
  userActive = sessionStorage.getItem('userName');
  user: Customer = new Customer();

  updatedCustomer: Customer = new Customer();

  ngOnInit(){
    this.getCustomerDetails(this.userActive)
  }
  getCustomerDetails(username:any){
    this.ws.getCustomer(username).subscribe({
      next:(data: Customer)  => {
        this.user = data;
      },
      error: (err: any) => {
        console.log("Get costumer email err:" + err);
      }
    })
 }

 UpdateCustomer(name:string, lastName:string, phone:string ){
  this.updatedCustomer = {
    customerID: this.user.customerID,
    nameStyle: this.user.nameStyle,
    title: this.user.title,
    firstName: name,
    middleName: this.user.middleName,
    lastName: lastName,
    suffix: this.user.suffix,
    companyName: this.user.companyName,
    salesPerson: this.user.salesPerson,
    emailAddress: this.user.emailAddress,
    phone: phone,
    passwordHash: this.user.passwordHash,
    passwordSalt: this.user.passwordSalt,
    rowguid: this.user.rowguid,
    tmpPassword: this.user.tmpPassword,
    modifiedDate: new Date(),
    isOld : 0
   }

   this.ws.SaveUpdate(this.updatedCustomer.emailAddress, this.updatedCustomer).subscribe({
    next: (data: Customer) => {
    console.log(data)
      
    },
    error: (err: any) => {
      console.log(err.status);
    },
   })
}


}
