import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAreaService } from '../../shared/crudhttp/customer-area.service';
import { Customer } from '../../shared/modelsdata/Customer';
import { Router } from '@angular/router';
import { Address } from '../../shared/modelsdata/Address';
import { SalesOrderDetails } from '../../shared/modelsdata/SalesOrderDetails';



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
  updatedCustomer: Customer = new Customer();

  customerOrder: SalesOrderDetails = new SalesOrderDetails()
  customerOrdersList: SalesOrderDetails[] = []

  failckPwd = false;
  showPersonalInfo = false;
  showAddressBox = false;
  showChagePwd = false;
  showOrders = false;
  ShowcustArea = true;
  showWlc = true;
  showDataForm = false;
  showAddrForm = false; 
  successMsg = false;
  errorMsg = false;
  noAddress = false;
  noOrders = false;
  showAddress2 = false;

  addressID: number = 0;
  orderSalesID: number = 0;


  ngOnInit() {
    this.getCustomerDetails(this.userActive);

  }
  getCustomerDetails(username: any) {
    this.ws.getCustomer(username).subscribe({
      next: (data: Customer) => {
        this.user = data;
        this.user.customerAddresses.forEach(address => {
          this.addressID = address.addressId;
        });

        this.user.salesOrderHeaders.forEach(order =>{
          this.orderSalesID = order.salesOrderId ;
        })
      },
      error: (err: any) => {
        console.log("Get costumer email err:" + err);
      }
    })
  }

  UpdateCustomer(name: string, lastName: string, phone: string, tmpPassword: string, checkpwd: string) {
    if (name == '' || name == null) {
      name = this.user.firstName
    }
    if (lastName == '' || lastName == null) {
      lastName = this.user.lastName
    }
    if (phone == '' || phone == null) {
      phone = this.user.phone
    }
    if (tmpPassword == '' || tmpPassword == null) {
      tmpPassword = this.user.tmpPassword
    } else if(tmpPassword != checkpwd){
      this.failckPwd = true;
      return;
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
      customerAddresses: [],
      salesOrderHeaders: []
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
          this.failckPwd = false;

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
    this.ws.GetCustomerAddress(id).subscribe({
      next: (data: Address) => {
        this.userAddress = data;
        if (this.userAddress.addressLine2 != null) {
          this.showAddress2 = true;
        }
    
        this.OpenAddressBox();
      },
      error: (err: any) => {
        if (this.userAddress.addressId == 0){
          this.noAddress = true
          this.CloseModiFyData()
          this.showPersonalInfo = false;
          this.showOrders = false;
          this.showChagePwd = false;
          this.noOrders = false;
        }
        
      }
    })
  }

  GetOrders(id: number) {
    this.ws.GetCustomersOrders(id).subscribe({
      next: (data: SalesOrderDetails[]) => {
        this.customerOrdersList = data
        if (this.customerOrdersList.length === 0){
          this.noOrders = true
          this.CloseModiFyData()
          this.showPersonalInfo = false;
          this.showAddressBox = false;
          this.showChagePwd = false;
          this.showOrders = false;
      }
        
      },
      error: (err: any) => {

      console.log(err)
      }
    })
    this.OpenOrdersBox();
  }

  OpenPersonalInfoBox() {
    this.showWlc = false;
    this.showPersonalInfo = true;
    this.showAddressBox = false;
    this.showChagePwd = false;
    this.showOrders = false;
    this.showAddrForm = false;
    this.ShowcustArea = false;
    this.errorMsg = false;
    this.successMsg = false;
    this.noAddress = false;
  }

  OpenAddressBox() {
    this.showWlc = false;
    this.showPersonalInfo = false;
    this.showAddressBox = true;
    this.showChagePwd = false;
    this.showOrders = false;
    this.ShowcustArea = false;
    this.errorMsg = false;
    this.successMsg = false;
    this.CloseModiFyData()
  }

  OpenPwdBox() {
    this.showWlc = false;
    this.showPersonalInfo = false;
    this.showAddressBox = false;
    this.showChagePwd = true;
    this.showOrders = false;
    this.ShowcustArea = false;
    this.showAddrForm = false;
    this.errorMsg = false;
    this.successMsg = false;
    this.CloseModiFyData()
    this.noAddress = false;
  }

  OpenOrdersBox(){
    this.showWlc = false;
    this.showPersonalInfo = false;
    this.showAddressBox = false;
    this.showChagePwd = false;
    this.showOrders = true;
    this.ShowcustArea = false;
    this.showAddrForm = false;
    this.errorMsg = false;
    this.successMsg = false;
    this.CloseModiFyData()
    this.noAddress = false;
  }

  OpenModifyData() {
    this.showDataForm = true;
    this.successMsg = false;
    this.errorMsg = false;
    this.errorMsg = false;
    this.successMsg = false;
  }

  OpenModifyAddress() {
    this.showAddrForm = true;
    this.successMsg = false;
    this.errorMsg = false;
    this.errorMsg = false;
    this.successMsg = false;
  }
  CloseModiFyData() {
    this.showDataForm = false;
    this.errorMsg = false;
    this.successMsg = false;
  }
  CloseModiFyAddr() {
    this.showAddrForm = false;
    this.errorMsg = false;
    this.successMsg = false;
  }

}
