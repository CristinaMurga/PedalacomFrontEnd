import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  
  constructor(private http: HttpClient) { }

  getCategoryParent(): Observable<any> {
    return this.http.get('https://localhost:7020/CategoryParents');
  }

  getCategoryChilds(productCategoryID: number): Observable<any> {
    return this.http.get(`https://localhost:7020/api/Category/${productCategoryID}`)
  }
}
