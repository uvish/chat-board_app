import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PostService } from '../services/post.service';

@Component({
  selector: 'create-sidebar',
  templateUrl: './create-sidebar.component.html',
  styleUrls: ['./create-sidebar.component.scss']
})
export class CreateSidebarComponent implements OnInit {
 channel={
   "name":"",
   "description":"",
   "admin_id":localStorage.getItem("id")
 };
 post={
  "title":"",
  "content":"",
  "user_id":localStorage.getItem("id"),
  "channel_id":""
}
 channels:any;
 x:any ;
  exists:any;

  constructor(private _snackbar:MatSnackBar,private httpClient: HttpClient,private channelService: ChannelService,private postService: PostService) { }
  
  ngOnInit(): void {
    this.channelService.getAll().subscribe(
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
      )
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
      )
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 2000,
    });
  }

}
