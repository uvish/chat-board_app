import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
posts:any;
  constructor(private postService: PostService) { }
  user_id=localStorage.getItem('id');
  ngOnInit(): void {
    this.postService.getAllPostsByUser(this.user_id).subscribe(
      response =>{
       this.posts=response;
       console.log("posts");
       console.log(response);
      },
      error =>{
        console.log(error);
      }
    );
  }

}
