import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private http: HttpClient) { }

  getProductDetails(productID: number): Observable<any> {
    return this.http.get(`https://localhost:7020/DetailedProducts/${productID}`)
  }
}
