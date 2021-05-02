import { Component, Input, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { JoinService } from '../services/join.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
@Input() allRequests:any;
  constructor(private _snackbar:MatSnackBar,private joinService:JoinService,private dashboardComponent:DashboardComponent) { }

  ngOnInit(): void {
  }
  accept(request_id:any){
  this.joinService.acceptRequest(request_id).subscribe(
    response =>{
      console.log(response);
      this.dashboardComponent.getChannelRequests();
      this.openSnackBar("Request Accepted","OK");
    },
    error =>{
      console.log(error);
    }
  );
 
  }
  deny(request_id:any){
    this.joinService.denyRequest(request_id).subscribe(
      response =>{
        console.log(response);
        this.dashboardComponent.getChannelRequests();
        this.openSnackBar("Request Denied","OK");
      },
      error =>{
        console.log(error);
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 500,
    });
  }

}
