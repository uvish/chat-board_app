import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { fadeIn, fadeOut } from '../shared/animations/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeIn, fadeOut]
})
export class RegisterComponent implements OnInit {
  credentials={
    "username":"",
    "email":"",
    "password":"",
    "firstname":"",
    "lastname":""
  }
  hide = true;


  
  constructor(private _snackbar:MatSnackBar,private authService:AuthService,private router:Router) {
   }

  ngOnInit(): void { 
  }

  signup() {
    console.log(this.ValidateEmail(this.credentials["email"]));
    if(this.credentials["username"] === '' || this.credentials["password"] ==='' || this.credentials["email"] ==='' || this.credentials["firstname"] ==='' || this.credentials["lastname"] ==='')
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
          this.authService.register(this.credentials).subscribe(
            response=>{
              console.log(response);
                  this.openSnackBar(response,"Ok");
                  this.router.navigate(['/login']);
            },
            error=>{
              console.log(error)
              this.openSnackBar(error,"Ok");
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
