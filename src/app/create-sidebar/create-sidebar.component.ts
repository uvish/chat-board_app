import { fadeIn, fadeOut } from './animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'create-sidebar',
  templateUrl: './create-sidebar.component.html',
  styleUrls: ['./create-sidebar.component.scss'],
  animations: [fadeIn,fadeOut]
})
export class CreateSidebarComponent implements OnInit {


  constructor(private authService: AuthService,private _snackbar:MatSnackBar,private httpClient: HttpClient,private channelService: ChannelService,private postService: PostService) { }
  
  channels:any;
  x:any ;
   exists:any;
   user_id:any;
   channel:any;
   post:any;

  createPostMode:boolean=false;
  togglePostMode(){
    this.createPostMode=!this.createPostMode;
    if(this.createChannelMode)
    this.createChannelMode=!this.createChannelMode;
  }
  createChannelMode:boolean=false;
  toggleChannelMode(){
    this.createChannelMode=!this.createChannelMode;
    if(this.createPostMode)
    this.createPostMode=!this.createPostMode;
  }


  async ngOnInit(): Promise<void> {
    this.user_id=await this.authService.getUserId();
 this.channel={
    "name":"",
    "description":"",
    "admin_id":this.user_id,
  };
  this.post={
   "title":"",
   "content":"",
   "user_id":this.user_id,
   "channel_id":""
 };
    this.channelService.getAllJoined(this.user_id).subscribe(
      response =>{
        this.channels=response;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    );

  }


  createPost(){
    console.log(this.post);
   if(this.post["title"]==='' || this.post["channel_id"]==='' || this.post["content"]==='') {
    this.openSnackBar("Post Fields can't be empty","Ok");
   }
   else{
      this.postService.createPost(this.post).subscribe(
         response =>{
          this.openSnackBar("Post Created","OK")
         },
         error=>{
          this.openSnackBar(error,"OK")
         }
      );
      window.location.reload();
   }
   
  }

  createChannel(){
    if(this.channel["name"]===''|| this.channel["description"]==='')
    {
      this.openSnackBar("Channel Fields can't be empty","Ok");
    }
    // else if(this.channelExists(this.channel["name"])){
    //   console.log(this.channelExists(this.channel["name"]))
    //   this.openSnackBar("Channel Already Exists","Ok");
    // }
    else{
      this.channelService.createChannel(this.channel).subscribe(
        response=>{
          console.log(response);
          if(response==='')
          this.openSnackBar("Channel Already Exists","OK")
          else this.openSnackBar("Channel Created","Ok");
           setTimeout(function(){ location.reload(); }, 2000);
        },
        error=>{
          console.log(error);
          this.openSnackBar(error,"Ok");
        }
      );
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 2000,
    });
  }

}
