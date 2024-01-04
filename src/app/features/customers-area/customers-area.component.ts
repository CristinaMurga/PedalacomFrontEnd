import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAreaService } from '../../shared/crudhttp/customer-area.service';
import { Customer } from '../../shared/modelsdata/Customer';
import { Router } from '@angular/router';
import { Address } from '../../shared/modelsdata/Address';
import { last } from 'rxjs';


@Component({
  selector: 'app-customers-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers-area.component.html',
  styleUrl: './customers-area.component.css'
})
export class CustomersAreaComponent {
  constructor(private ws: CustomerAreaService, private router: Router) { }

  userActive = sessionStorage.getItem('userName');
  user: Customer = new Customer();

  userAddress: Address = new Address();

  showDataForm = false;
  successMsg = false;
  errorMsg = false;
  updatedCustomer: Customer = new Customer();

  showAddress2 = false;



  ngOnInit() {
    this.getCustomerDetails(this.userActive);
    
    

  
  //  this.GetCustomerAddress(499)
  }
  getCustomerDetails(username: any) {
    this.ws.getCustomer(username).subscribe({
      next: (data: Customer) => {
        this.user = data;
        this.user.customerAddresses.forEach(element => {
          console.log(element.addressId);
          this.GetCustomerAddress(element.addressId)
          
        });

    
      },
      error: (err: any) => {
        console.log("Get costumer email err:" + err);
      }
    })
  }

  UpdateCustomer(name: string, lastName: string, phone: string, tmpPassword: string) {
    if(name == '' || name == null){
      name = this.user.firstName
    }
    if(lastName == '' || lastName == null){
    lastName = this.user.lastName
    }  
    if(phone == '' || phone == null){
      phone = this.user.phone
    }
    if(tmpPassword == '' || tmpPassword == null){
      tmpPassword = this.user.tmpPassword
    }




    this.updatedCustomer = {
      customerID: this.user.customerID,
      nameStyle: true,
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
      tmpPassword: tmpPassword,
      modifiedDate: new Date(),
      isOld: 0,
      customerAddresses: []
    }


    this.ws.SaveUpdate(this.updatedCustomer.emailAddress, this.updatedCustomer).subscribe({
      next: (data: any) => {
        if (data.status == 204) {
          //modificare
          console.log(data.status)
          console.log(data)
          this.getCustomerDetails(this.userActive)
          this.CloseModiFyData();
          this.successMsg = true;

        } else {
          alert('errore')

        }

      },
      error: (err: any) => {
        if (err.status == 400) {
          console.log(err.status);
          this.errorMsg = true;
        }

      },
    })
  }

  GetCustomerAddress(id: number) {
    this.ws.GetCostumerAddress(id).subscribe({
      next: (data: Address) => {
        this.userAddress = data;
        console.log(data)
        if(this.userAddress.addressLine2 != null){
          this.showAddress2 = true;
        }
      },
      error:(err: any)=> {
        console.log
      }
    })
  }

  OpenModifyData() {
    this.showDataForm = true;
    this.successMsg = false;
    this.errorMsg = false;
  }

  CloseModiFyData() {
    this.showDataForm = false;
  }

}
