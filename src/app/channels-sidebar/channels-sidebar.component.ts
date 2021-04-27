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

    this.channelsService.getAll().subscribe(
      response =>{
        this.channels=response;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    );
  //  console.log(this.channelsService.getAll());
  }
  
}
