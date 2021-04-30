import { Component,Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'brief-post',
  templateUrl: './brief-post.component.html',
  styleUrls: ['./brief-post.component.scss']
})
export class BriefPostComponent implements OnInit {

  @Input() post_data:any;
  answers:any;
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postService.getAllAnswersByPost(this.post_data["post_id"]).subscribe(
      response =>{
        this.answers=response;
        
      },
      err =>{console.log(err);}
    );
  }

}
