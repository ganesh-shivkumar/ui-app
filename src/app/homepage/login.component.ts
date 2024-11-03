import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from './api_service';
import { timer } from 'rxjs';

interface LoginResponse {
  "status" : string;
  "message" : string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private apiservice:ApiService, private router: Router, 
  ) {}

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.email]);

  headerTitle = 'Login';
  loginView = true;
  inprogress = false;
  errorDetails = '';

  toggleView(){
    this.loginView = !this.loginView;
    if(this.loginView){
      this.headerTitle = 'Login';
    }else{
      this.headerTitle = 'Create Account'
    }
  }

  login(){
      if(this.emailFormControl.hasError('email') ||
         this.emailFormControl.hasError('required') ||
         this.passwordFormControl.hasError('required')){
          alert('Fix the errors before submitting');
          return
      }
      this.inprogress = true;

      const action = (this.loginView) ?  'LOGIN' : 'CREATE';
      const loginPayload = {
        "username" : this.emailFormControl.value,
        "password" : this.passwordFormControl.value,
        "action" : action
      }
      this.apiservice.login(JSON.stringify(loginPayload))
      .subscribe(data => {
        const loginResponse: LoginResponse = JSON.parse(data.toString());
        this.errorDetails = loginResponse.message || '';
        if(loginResponse.status === 'SUCCESS'){
          timer(1500).subscribe(() => {
            this.inprogress = false;
            this.router.navigate(['playground'],{queryParams: {'loginvalidated': true}, skipLocationChange: true}); }
          )};
      });
  }
}
