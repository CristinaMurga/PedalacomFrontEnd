import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService]
})
export class LoginComponent {
  constructor(private login:LoginService){}
  
  Login(userName:string, pwd: string){
    this.login.RunLogin(userName,pwd).subscribe((resp) =>{
      console.log('resp:' + resp.status);
      if(resp.status == 200) {
        this.login.setTokenHttpHeader(userName,pwd);
      }else if(resp.status == HttpStatusCode.Unauthorized){
        console.log('Impossibile eseguire il login');
      }
    })
  }

}
