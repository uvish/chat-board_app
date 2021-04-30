import { Component,Input, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'mychannels',
  templateUrl: './mychannels.component.html',
  styleUrls: ['./mychannels.component.scss']
})
export class MychannelsComponent implements OnInit {
@Input() user_id:any;
channels:any;
  constructor(private channelService:ChannelService) { }

  ngOnInit(): void {
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
