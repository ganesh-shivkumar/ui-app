import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageModule } from './homepage/homepage.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService } from './homepage/api_service';

interface LoginResponse {
  "status" : string;
  "message" : string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            RouterOutlet,
            HomepageModule,
            MatFormFieldModule,
            MatInputModule,
            FormsModule,
            ReactiveFormsModule,
            MatCardModule,
            MatButtonModule,
            CommonModule,
            MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private apiservice:ApiService) { }

  title = 'ui-app';

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
        this.inprogress = false;
      });
  }
}
