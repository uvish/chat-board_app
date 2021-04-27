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
  constructor(private http: HttpClient) { }
  getVotes(answer_id:any){
     return this.http.get(`http://localhost:8080/api/vote/get/`.concat(answer_id),{responseType: 'json'});
  }
  upvote(voteRequest:any){
    return this.http.post(`http://localhost:8080/api/vote/upvote`,voteRequest,{responseType: 'text'});
  }
  downvote(voteRequest:any){
    return this.http.post(`http://localhost:8080/api/vote/downvote`,voteRequest,{responseType: 'text'});
  }
}
