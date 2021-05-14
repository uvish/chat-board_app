import { Component, Inject, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ChannelService } from 'src/app/services/channel.service';
import { ThisReceiver } from '@angular/compiler';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { fadeIn, fadeOut } from '../animations/animations';

export interface editedPost{
  "post_id":string,
  "content":string,
  "title":string
};


@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [fadeIn, fadeOut]
})
export class PostComponent implements OnInit {
  @Input() post_data:any;
  @Input() channel_id:any;
  admin_id:any;
  answers:any;       // all pre-existing answers
  answer={               // new answer to be submitted
    "answer":"",
    "post_id":"",
    "user_id":""
  };
  editedPost={
    "post_id":"",
    "content":"",
    "title":""
  };
  edit_mode:boolean=true;
  toggle_edit_mode(){
    this.edit_mode=!this.edit_mode;
  }
  
 



  answers_visible:boolean=false;
  toggleAnswers(){
    this.answers_visible=!this.answers_visible;
  }

  sorting_method:string="date";
  canDelete:boolean=false;
  user_id:any;
  constructor(private dialog:MatDialog,private postService:PostService,private _snackbar:MatSnackBar,private channelService:ChannelService,private authService:AuthService) { }

  async ngOnInit(): Promise<void> {
  const editModal=document.getElementById("editModal");
  this.user_id =await this.authService.getUserId();

    this.answer={
      "answer":"",
      "post_id":"",
      "user_id":""
    };
    this.editedPost={
      "post_id":this.post_data["post_id"],
      "content":this.post_data["content"],
      "title":this.post_data["title"]
    };

    


    this.getChannelAdmin(this.channel_id);

    // this.postService.getAllAnswersByPost(this.post_data["post_id"]).subscribe(
    //   response =>{
    //     this.answers=response;
    //     console.log(response);
    //   },
    //   err =>{console.log(err);}
    // );
    this.getAllAnswers();
    setInterval(() =>{  this.getAllAnswers(); }, 10000);
   
    if(this.post_data["user_id"]==this.user_id)
   { this.canDelete=true;}
  }


  getAllAnswers(){
    this.postService.getAllAnswersByPost(this.post_data["post_id"]).subscribe(
        response =>{
          this.answers=response;
          console.log(response);
        },
        err =>{console.log(err);}
      );
  }


  refresh(post_id:number){
    this.postService.getAllAnswersByPost(post_id).subscribe(
      response =>{
        this.answers=response;
        console.log("refreshed answers");
        console.log(this.answers);
      },
      err =>{console.log(err);});

      if(this.sorting_method=="date")
      this.sortAnswersByDate();
      if(this.sorting_method=="helpful")
      this.sortAnswersByUpvotes();
  }
 


  saveEditedPost(){
    this.postService.editPost(this.editedPost).subscribe(
      response =>{window.location.reload();},
      err =>{console.log(err);}
    );
  }
  
  sortAnswersByDate(){
    this.sorting_method="date";
    this.ngOnInit() //originally answers are sorted by date
  }
  sortAnswersByUpvotes(){
    this.sorting_method="uvotes";
    this.answers.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
      if (a["down_votes"] == 0 && b["down_votes"] == 0) {
          return b["up_votes"] - a["up_votes"];
      }
      else if (a["down_votes"] == 0 && a["up_votes"] > 0) {
          return -1;
      }
      else if (b["down_votes"] == 0 && b["up_votes"] > 0) {
          return 1;
      }
      return (b["up_votes"] -b["down_votes"]) - (a["up_votes"] - a["down_votes"]);
    });
    console.log(this.answers);
  }

  refreshEditDetails(){
    this.toggle_edit_mode();
    this.ngOnInit();
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  getChannelAdmin(ch_id:any){
    this.channelService.getAdminIdFromChannel(ch_id).subscribe(
      response =>{
        this.admin_id=response;
        console.log("admin_id");
        console.log(response);
        //return response;
        if(this.admin_id==this.user_id)
        {
          this.canDelete=true;
        }
      },
      err =>{console.log(err);}
    );    
  }
  

 postAnswer(){
    this.answer["post_id"] = this.post_data["post_id"];
   this.answer["user_id"] =this.user_id;
    console.log(this.answer);
    this.postService.postAnswer(this.answer).subscribe(
      response =>{
        this.ngOnInit();
      },
      err =>{}
    );
  }

  deletePost(){
    this.postService.deletePost(this.post_data["post_id"]).subscribe(
      response =>{
        // this.openSnackBar(response,"Ok");
        console.log(response);
      },
      err =>{
        console.log(err);
      }
    )
    window.location.reload();
  }

  openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 2000,
    });
  }


 
}


