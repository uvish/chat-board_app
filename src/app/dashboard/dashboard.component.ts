import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JoinService } from '../services/join.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
posts:any;
user_id:any;
no_posts:boolean=false;
allRequests:any;
  constructor(private postService: PostService,private authService: AuthService,private joinService: JoinService) {
   }

  ngOnInit(): void {
    this.user_id=this.authService.getUserId();
    this.postService.getAllPostsByUser(this.user_id).subscribe(
      response =>{
       this.posts=response;
       if(this.posts.length===0)
       this.no_posts=true;
      },
      error =>{
        console.log(error);
      }
    );
    this.getChannelRequests();
  }
  getChannelRequests(){
   this.joinService.getAllRequests(this.user_id).subscribe(
     data =>{
       console.log("requests");
       this.allRequests=data;
       console.log(data);
      },
     error =>{console.log(error);}
     );
  }

}
