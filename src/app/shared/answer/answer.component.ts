import { AnswerService } from './../../services/answer.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { ChannelComponent } from 'src/app/channel/channel.component';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() answer_data:any;
  canDelete:boolean = false;
  // votes:any;
  voteRequest:any;
  user_id:any;
  constructor(private answerService:AnswerService,private postComponent:PostComponent,private authService:AuthService) { }

  async ngOnInit(): Promise<void> {
    this.user_id=await this.authService.getUserId();
    // console.log(this.answer_data);
    // this.answerService.getVotes(this.answer["answer_id"]).subscribe(
    //   response =>{
    //     this.votes=response;
    //   },
    //   err =>{console.log(err);}
    // );
    
    if(this.answer_data["user_id"]==this.user_id){
    this.canDelete=true;
    }
    if(this.answerService.getAnswerAdmin(this.answer_data["answer_id"] == this.user_id))
    this.canDelete=true;
  }
  // ngOnChanges(): void {
  //   this.ngOnInit();
  // }

  upvote(){
   this.voteRequest={
      "user_id":this.user_id,
      "answer_id":this.answer_data["answer_id"]
    }
    console.log(this.voteRequest);
    this.answerService.upvote(this.voteRequest).subscribe(
      response =>{
        console.log(response);
        this.postComponent.refresh(this.answer_data["post_id"]);
        // this.channelComponent.ngOnInit();
      },
      error=>{
        console.log(error)
      }
    );
    
  }
  downvote(){
    this.voteRequest={
      "user_id":this.user_id,
      "answer_id":this.answer_data["answer_id"]
    }
    console.log(this.voteRequest);
    this.answerService.downvote(this.voteRequest).subscribe(
      response =>{
        // console.log("downvoted");
        this.postComponent.refresh(this.answer_data["post_id"]);
        // this.channelComponent.ngOnInit();
      },
      error=>{
        console.log(error)
      }
    );;
  }

  deleteAnswer(){
    this.answerService.deleteAnswer(this.answer_data["answer_id"]).subscribe(
      response =>{
       
      },
      error=>{
        console.log(error);
      }
    )
    window.location.reload();
  }

}
