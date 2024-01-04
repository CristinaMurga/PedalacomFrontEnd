import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../modelsdata/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerAreaService {

  constructor(private http: HttpClient) { }

  getCustomer(email: string): Observable<any> {
    return this.http.get(`https://localhost:7020/api/Customers/${email}`)
 }

 SaveUpdate(email: string, customer: Customer): Observable<any> {
  return this.http.put(`https://localhost:7020/api/Customers/${email}`, customer, {observe: 'response'});
 
}

GetCostumerAddress(id: number) : Observable<any> {
  return this.http.get(`https://localhost:7020/api/Addresses/${id}`);
}
 

}
