import { AnswerService } from './../../services/answer.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() answer:any;
  votes:any;
  voteRequest={
    "user_id":JSON.parse(localStorage.getItem('id') || '{}'),
    "answer_id":""
  }
  constructor(private answerService:AnswerService) { }

  ngOnInit(): void {
    this.answerService.getVotes(this.answer["answer_id"]).subscribe(
      response =>{
        this.votes=response;
      },
      err =>{console.log(err);}
    )
  }
  ngOnChanges(): void {
    this.ngOnInit();
  }

  upvote(){
    this.voteRequest["answer_id"]=this.answer["answer_id"];
    console.log(this.voteRequest);
    this.answerService.upvote(this.voteRequest).subscribe(
      response =>{
        // console.log("upvoted");
        this.ngOnInit();
      },
      error=>{
        // console.log("in error");
        console.log(error)
      }
    );
    
  }
  downvote(){
    this.voteRequest["answer_id"]=this.answer["answer_id"];
    console.log(this.voteRequest);
    this.answerService.downvote(this.voteRequest).subscribe(
      response =>{
        console.log("downvoted");
        this.ngOnInit();
      },
      error=>{
        console.log(error)
      }
    );;
  }

}
