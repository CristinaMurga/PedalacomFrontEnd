import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../modelsdata/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor (private http: HttpClient) { }

  headerOptions = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  })


  getCart(customerEmail: any) : Observable<any>{
    const token = sessionStorage.getItem('token');

    this.headerOptions = this.headerOptions.set('Authorization', 'Basic ' + token);


    return this.http.get(`https://localhost:7020/Carts/${customerEmail}`, {headers: this.headerOptions} )
  }

  addProduct(cart: Cart) : Observable<any>{
    const token = sessionStorage.getItem('token');

    this.headerOptions = this.headerOptions.set('Authorization', 'Basic ' + token);

    return this.http.post(`https://localhost:7020/Carts`, cart, {headers: this.headerOptions} )
  }

  deleteProductfromCart(cartId: number) : Observable<any>{

    const token = sessionStorage.getItem('token');

    this.headerOptions = this.headerOptions.set('Authorization', 'Basic ' + token);

    return this.http.delete(`https://localhost:7020/Carts/${cartId}`, {headers: this.headerOptions} )
  }
}
