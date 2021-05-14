import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JoinService } from '../services/join.service';
import { AuthService } from '../services/auth.service';
import { fadeIn, fadeOut } from '../shared/animations/animations';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  animations: [fadeIn, fadeOut]
})
export class ChannelComponent implements OnInit {
channel_id:any;
channel_details:any;
posts:any;
no_posts:boolean=false;
joinStatus:String="";
joinRequest:any;
  constructor(private _snackbar:MatSnackBar,private router:Router, private authService:AuthService,private joinService:JoinService,private postService:PostService,private activateRouter:ActivatedRoute,private channelService:ChannelService) {
    
   }

  async ngOnInit(): Promise<void> {
    this.channel_id=this.activateRouter.snapshot.params.id;
    this.joinRequest={
      "user_id":await this.authService.getUserId(),
      "channel_id":this.channel_id
    };
    this.getJoinStatus();
    setInterval(() =>{  this.getJoinStatus(); }, 10000);
    // this.getJoinStatus();

    // this.postService.getAllPostsByChannel(this.channel_id).subscribe(
    //   response =>{this.posts=response
    //   if(this.posts.length===0)
    //    this.no_posts=true;
    //   },
    //   error=>{console.log(error)}
    // );
    this.posts=await this.postService.getAllPostsByChannel(this.channel_id).toPromise();
     if(this.posts.length==0)this.no_posts=true;


    this.channelService.getChannelDetails(this.channel_id).subscribe(
      response =>{
        this.channel_details=response;
      },
      error=>{console.log(error);}
    );
    
  }

  getJoinStatus(){
   this.joinService.getStatus(this.joinRequest).subscribe(
     response =>{
       this.joinStatus=response;
       console.log(response);
       return response;
     },
     error =>{console.log(error);}
   );

  }

  joinButton(){
    if(!(this.joinStatus==="Admin")){
    this.joinService.requestJoin(this.joinRequest).subscribe(
      response =>{
        console.log(response);
        this.getJoinStatus();
       },
      error =>{console.log(error);
        this.getJoinStatus();
      }
    );
    }
  }

  deleteChannel(){
    this.channelService.deleteChannel(this.channel_id).subscribe(
      response =>{
        this.openSnackBar("Channel deleted","Ok");
        this.router.navigate(['/dashboard']);

      },
      error =>{console.log(error);}
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 2000,
    });
  }
 


}
