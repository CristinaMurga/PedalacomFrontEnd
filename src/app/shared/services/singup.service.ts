import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../modelsdata/Customer';


@Injectable({
  providedIn: 'root'
})
export class SingupService {

  constructor(private http:HttpClient) { }

  PostCustomer(customer: Customer){

    return this.http.post('https://localhost:7020/api/Customers', customer);
  }
}
