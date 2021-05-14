import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'channels-sidebar',
  templateUrl: './channels-sidebar.component.html',
  styleUrls: ['./channels-sidebar.component.scss']
})
export class ChannelsSidebarComponent implements OnInit {

  constructor(private channelsService:ChannelService) { }
 
  channels:any;
  ngOnInit(): void {
    this.getAllChannels();
    setInterval(() =>{  this.getAllChannels(); }, 10000);
  }
  getAllChannels(){
    this.channelsService.getAll().subscribe(
      response =>{
        this.channels=response;
      },
      error=>{
        console.log(error);
      }
    );
  }
  
}
