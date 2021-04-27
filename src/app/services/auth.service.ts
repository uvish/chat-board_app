import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  register(credentials:any){
    console.log(credentials);
    return this.http.post(`http://localhost:8080/api/auth/signup`,credentials, {responseType: 'text'});
  }
  login(credentials:any){
    console.log(credentials);
    return this.http.post(`http://localhost:8080/api/auth/login`,credentials, {responseType: 'text'});
  }
  save_login(response: string){
    localStorage.setItem("username",response.split(":")[0])
    localStorage.setItem("id",response.split(":")[1])
    window.location.href="/dashboard"
    return true;
  }
  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    return true;
  }
  isLoggedIn(){
    let user=localStorage.getItem("username");
    if(user==undefined || user==='' || user==null)
    return false;
    else return true;
  }
}
