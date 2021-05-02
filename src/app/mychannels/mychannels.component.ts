import { Component,Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'mychannels',
  templateUrl: './mychannels.component.html',
  styleUrls: ['./mychannels.component.scss']
})
export class MychannelsComponent implements OnInit {
user_id:any;
channels:any;
  constructor(private channelService:ChannelService,private authService:AuthService) { }

   async ngOnInit() {
    this.user_id =await this.authService.getUserId();
   this.channelService.getAllChannelsByUser(this.user_id).subscribe(
      response =>{
        this.channels = response;
        console.log("my channels");
        console.log(response);
      },
      err =>{
        console.log(err);
      }
    );
  }

}
