import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials={
    "email":"",
    "password":"",
  }
  hide=true;
  constructor(private _snackbar:MatSnackBar,private authService:AuthService,private router:Router) {
  }

  ngOnInit(): void {
  }
  
  login(){
    if(this.credentials["password"] ==='' || this.credentials["email"] ==='')
    {
           this.openSnackBar("Fields can't be empty","Ok")
    }
    if (!this.ValidateEmail(this.credentials["email"])){
      this.openSnackBar("Invalid Email!","Ok")
    }
    if (!this.ValidatePassword(this.credentials["password"])){
      this.openSnackBar("Password must be atleast 6 characters ,1 number and 1 Uppercase and Lowercase character ","Ok")
    }
    else{
          this.authService.login(this.credentials).subscribe(
            response=>{
                  this.authService.save_token(response);
                  window.location.href="/dashboard";
            },
            error=>{
              console.log(error)
              this.openSnackBar(error["User Not Found"],"Ok");
            } 
          )
       }
  }

  ValidateEmail(mail:string) 
  {
   if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(mail))
    {
      return (true)
    }
      return (false)
  }
  
    ValidatePassword(password: String) {
      var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (password.match(passw)) {
        return true;
      }
      else {
        return false;
      }
    }
  
    openSnackBar(message: string, action: string) {
      this._snackbar.open(message, action, {
        duration: 2000,
      });
    }

}
