import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
 votes={
   "upvotes":"",
   "downvotes":""
 }
 BASE_URL="http://localhost:8080";
  constructor(private http: HttpClient) { }
  getVotes(answer_id:any){
     return this.http.get(this.BASE_URL+`/api/vote/get/`.concat(answer_id),{responseType: 'json'});
  }
  upvote(voteRequest:any){
    return this.http.post(this.BASE_URL+`/api/vote/upvote`,voteRequest,{responseType: 'text'});
  }
  downvote(voteRequest:any){
    return this.http.post(this.BASE_URL+`/api/vote/downvote`,voteRequest,{responseType: 'text'});
  }
  deleteAnswer(answer_id:any){
    return this.http.post(this.BASE_URL+`/api/answer/delete/`.concat(answer_id),{responseType: 'json'});
  }
  getAnswerAdmin(answer_id:any){
    return this.http.get(this.BASE_URL+`/api/answers/getAdminIdByAnswer/`.concat(answer_id),{responseType: 'text'});
  }
}
