import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../modelsdata/Customer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  tokenKey: string = 'token';
  userName:string = 'userName';
 
  constructor(private http:HttpClient, private ngZone: NgZone) { }
  user:User = new User();
  
  headerOptions = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  })


  RunLogin(user:string, pwd:string) {
    this.setTokenHttpHeader(user, pwd)
    this.user = {username: user, password: pwd};
    console.log(this.headerOptions);
    return this.http.post('https://localhost:7020/Login', this.user, {headers: this.headerOptions, observe: 'response'});
  }
  setTokenHttpHeader(user:string, pwd:string){
    this.headerOptions = 
      this.headerOptions.set('Authorization','Basic ' + btoa(user + ':' + pwd));
      sessionStorage.setItem(this.tokenKey, btoa(user + ':' + pwd));
      sessionStorage.setItem(this.userName, user);
   
  }

  getCustomersEmail(email: string): Observable<any> {
     return this.http.get(`https://localhost:7020/api/Customers/${email}`)
  }

  SaveUpdate(email: string, customer: Customer): Observable<any> {
    return this.http.put(`https://localhost:7020/api/Customers/${email}`, customer, {observe: 'response'});
  }

  private isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$: Observable<boolean> = this.isUserLoggedInSubject.asObservable();

  setUserLoggedIn(value: boolean) {
    this.ngZone.run(() => {
      this.isUserLoggedInSubject.next(value);
      console.log('Cambiamento di stato rilevato:', value);
    });
  }

  getUserLoggedIn(): boolean {
    return this.isUserLoggedInSubject.value;
  }

}

export class User {
  username:string = '';
  password:string= '';
}
