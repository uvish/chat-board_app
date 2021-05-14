import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss']
})
export class RecentPostsComponent implements OnInit {

  recentPostsExists:boolean = false;
  constructor(private postService: PostService) { }
  recentPosts:any;
  noPosts:boolean = false;
  ngOnInit(): void {
    this.getRecent();
    setInterval(() =>{  this.getRecent(); }, 10000);
  }
  getRecent(){
    this.postService.getRecent().subscribe(
      response=>{
        this.recentPosts=response;
        if(this.recentPosts.length>1)
        this.noPosts=true;
      },err=>{console.log(err);}
    );
  }

}
