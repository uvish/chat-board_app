import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 username:any="";
 user_id:any="";
  constructor(private http:HttpClient) { }
  register(credentials:any){
    return this.http.post(`http://localhost:8080/api/auth/signup`,credentials, {responseType: 'text'});
  }
  login(credentials:any){
    return this.http.post(`http://localhost:8080/api/auth/login`,credentials, {responseType: 'text'});
  }
  save_token(response: string){
    // localStorage.setItem("username",response.split(":")[0]);
    // localStorage.setItem("id",response.split(":")[1]);
    // console.log("token");
    // console.log(response);
    localStorage.setItem("token",response);
    console.log(response);
    // window.location.href="/dashboard";
    return true;
  }
  logout(){
    // localStorage.removeItem("username");
    // localStorage.removeItem("id");
    localStorage.removeItem("token");
    return true;
  }
  isLoggedIn(){
    // let user=localStorage.getItem("username");
    // if(user==undefined || user==='' || user==null)
    // return false;
    // else return true;
    let token=localStorage.getItem("token");
    if(token==undefined || token==null || token=='')
    return false;
    else return true;
  }
  async getUserId():Promise<string>{
    // return JSON.parse(localStorage.getItem('id') || '{}');
    // let token=JSON.parse(localStorage.getItem('token') || '{}');
    const token=localStorage.getItem("token") || '';
    const response=await this.http.get(`http://localhost:8080/api/auth/authenticate/`.concat(token),{responseType: 'text'}).toPromise();
        this.user_id=response.split(":")[1];
        this.username=response.split(":")[0];
        console.log(this.user_id);
        console.log(this.username);
       return this.user_id;


    // const token=localStorage.getItem("token") || '';
    // this.http.get(`http://localhost:8080/api/auth/authenticate/`.concat(token),{responseType: 'text'}).subscribe(
    //   response =>{
    //     this.user_id=response.split(":")[1];
    //     this.username=response.split(":")[0];
    //     console.log(this.user_id);
    //    return this.user_id;
    //   },
    //   error =>{
    //     console.log(error);
    //   }
    // );


  //  while(this.user_id === "");
  //  return this.user_id;
  }
  async getUsername(){
    // return JSON.parse(localStorage.getItem('username') || '{}');
    // let token=JSON.parse(localStorage.getItem('token') || '{}');
    const token=localStorage.getItem("token") || '';
    const response=await this.http.get(`http://localhost:8080/api/auth/authenticate/`.concat(token),{responseType: 'text'}).toPromise();
        this.username=response.split(":")[0];
       return this.username;
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
