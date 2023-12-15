import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
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
      localStorage.setItem('token', btoa(user + ':' + pwd));
      localStorage.setItem('userName', user);
  }
}

export class User {
  username:string = '';
  password:string= '';
}
