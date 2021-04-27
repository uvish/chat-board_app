import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post:any;
  answers:any;

  answer={
    "answer":"",
    "post_id":"",
    "user_id":""
  }
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postService.getAllAnswersByPost(this.post["post_id"]).subscribe(
      response =>{
        this.answers=response;
        console.log("answers");
        console.log(this.answers);
      },
      err =>{console.log(err);}
    )
    this.answer={
      "answer":"",
      "post_id":"",
      "user_id":""
    }
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }
  

  postAnswer(){
    this.answer["post_id"] = this.post["post_id"];
    this.answer["user_id"] =JSON.parse(localStorage.getItem('id') || '{}');
    console.log(this.answer);
    this.postService.postAnswer(this.answer).subscribe(
      response =>{
        this.ngOnInit();
      },
      err =>{}
    )
  }
 
}
