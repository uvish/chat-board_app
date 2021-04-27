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
posts:any;
  constructor(private postService:PostService,private activateRouter:ActivatedRoute) {
    this.channel_id=this.activateRouter.snapshot.params.id;
    this.postService.getAllPostsByChannel(this.channel_id).subscribe(
      response =>{this.posts=response},
      error=>{console.log(error)}
    );
    console.log(this.posts)
   }

  ngOnInit(): void {
    
  }

}
