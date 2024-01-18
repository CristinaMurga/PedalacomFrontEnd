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


  //esegui il post del login e le passo il token
  RunLogin(user:string, pwd:string) {
    this.setTokenHttpHeader(user, pwd)
    this.user = {username: user, password: pwd};
    console.log(this.headerOptions);
    return this.http.post('https://localhost:7020/Login', this.user, {headers: this.headerOptions, observe: 'response'});
  }

  //creo il token in session storage 
  setTokenHttpHeader(user:string, pwd:string){
    this.headerOptions = 
      this.headerOptions.set('Authorization','Basic ' + btoa(user + ':' + pwd));
      sessionStorage.setItem(this.tokenKey, btoa(user + ':' + pwd));
      sessionStorage.setItem(this.userName, user);
   
  }

  //ricupero i dati dei customer per verificare se esite l'account.
  getCustomersEmail(email: string): Observable<any> {
     return this.http.get(`https://localhost:7020/api/Customers/${email}`)
  }

  //salvo la modifica dei dati del customer
  SaveUpdate(email: string, customer: Customer): Observable<any> {
    return this.http.put(`https://localhost:7020/api/Customers/${email}`, customer, {observe: 'response'});
  }

// La classe BehaviorSubject è un tipo di Observable che memorizza l'ultimo valore emesso e lo rende disponibile 
//a tutti gli osservatori che si sottoscrivono ad esso.
// L'Observable<boolean> può essere sottoscritto da altri componenti o servizi per ricevere gli aggiornamenti 
//sullo stato di accesso dell'utente. Quando il valore di isUserLoggedInSubject cambia, tutti gli osservatori iscritti a 
//isUserLoggedIn$ riceveranno l'ultimo valore emesso.

  private isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$: Observable<boolean> = this.isUserLoggedInSubject.asObservable();

  setUserLoggedIn(value: boolean) {
    this.ngZone.run(() => {
      this.isUserLoggedInSubject.next(value);
    });
  }

}

export class User {
  username:string = '';
  password:string= '';
}
