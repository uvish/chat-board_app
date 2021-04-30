import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
channel_id:any;
channel_details:any;
posts:any;
no_posts:boolean=false;
  constructor(private postService:PostService,private activateRouter:ActivatedRoute,private channelService:ChannelService) {
    
   }

  ngOnInit(): void {
    this.channel_id=this.activateRouter.snapshot.params.id;
    this.postService.getAllPostsByChannel(this.channel_id).subscribe(
      response =>{this.posts=response
      if(this.posts.length===0)
       this.no_posts=true;
      },
      error=>{console.log(error)}
    );
    console.log(this.posts);

    this.channelService.getChannelDetails(this.channel_id).subscribe(
      response =>{
        this.channel_details=response;
      },
      error=>{console.log(error);}
    );
  }


}
