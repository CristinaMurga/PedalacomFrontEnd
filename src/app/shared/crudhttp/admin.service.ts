import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../modelsdata/product';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  headerOptions = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  })

  constructor(private http: HttpClient) { }

  getAdmin(email: any): Observable<any> {
    return this.http.get(`https://localhost:7020/OldCustomers/${email}`)
  }

  getProducts(): Observable<any> {
    return this.http.get(`https://localhost:7020/api/Products`)
  }

  addProducts(product: Product): Observable<any> {
    const token = sessionStorage.getItem('token');
    console.log('Token:', token);

    this.headerOptions = this.headerOptions.set('Authorization', 'Basic ' + token);
    console.log('Headers:', this.headerOptions);

    return this.http.post(`https://localhost:7020/api/Products`, product, { headers: this.headerOptions });
  }

  DeleteProduct(id: number): Observable<any> {
    const token = sessionStorage.getItem('token');

    this.headerOptions = this.headerOptions.set('Authorization', 'Basic ' + token);

    return this.http.delete(`https://localhost:7020/api/Products/${id}`, {headers: this.headerOptions});
  }

  EditProduct(id: number, product : Product): Observable<any> {
    const token = sessionStorage.getItem('token');

    this.headerOptions = this.headerOptions.set('Authorization', 'Basic ' + token);

    return this.http.put(`https://localhost:7020/api/Products/${id}`, product, {headers: this.headerOptions});

  }



  GetCategories(): Observable<any> {
    return this.http.get('https://localhost:7020/api/CategoryChilds')
  }

  GetModels(): Observable<any> {
    return this.http.get('https://localhost:7020/api/Models')
  }

}
