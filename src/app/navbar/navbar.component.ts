import { NavbarService } from './../services/navbar.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,public nav:NavbarService) { 
    nav.show();
  }
  title:any;
  loggedIn:boolean = false;
  username:any;

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.loggedIn=true;
      this.username=localStorage.getItem("username");
    }
  }

  logout() {
    this.authService.logout();
    location.reload();
  }

}
