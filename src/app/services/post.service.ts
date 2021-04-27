import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  createPost(post:any){
    return this.http.post(`http://localhost:8080/api/posts/create`,post,{responseType: 'json'});
  }
  getAllPostsByUser(user_id:any){
    return this.http.get(`http://localhost:8080/api/posts/all/`.concat(user_id),{responseType:'json'});
  }
  getAllPostsByChannel(channel_id:any){
    return this.http.get(`http://localhost:8080/api/posts/channel/`.concat(channel_id),{responseType:'json'});
  }
  postAnswer(answer: any){
    return this.http.post(`http://localhost:8080/api/answer/create`,answer,{responseType:'json'});
  }
  getAllAnswersByPost(post_id:any){
    return this.http.get(`http://localhost:8080/api/answer/get/`.concat(post_id),{responseType:'json'});
  }
}
