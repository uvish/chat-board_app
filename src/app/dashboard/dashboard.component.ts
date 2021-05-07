import { Component, OnInit } from '@angular/core';
import { MychannelsComponent } from '../mychannels/mychannels.component';
import { AuthService } from '../services/auth.service';
import { JoinService } from '../services/join.service';
import { PostService } from '../services/post.service';
import { fadeIn, fadeOut } from '../shared/animations/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeIn, fadeOut]
})
export class DashboardComponent implements OnInit {
posts:any;
user_id:any;
no_posts:boolean=false;
allRequests:any;

  constructor(private postService: PostService,private authService: AuthService,private joinService: JoinService) {
   }

  async ngOnInit(): Promise<void> {
    this.user_id=await this.authService.getUserId();
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
       this.allRequests=data;
      },
     error =>{console.log(error);}
     );
  }



}
