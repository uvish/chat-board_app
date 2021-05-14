import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  BASE_URL="http://localhost:8080";
  constructor(private http:HttpClient) { }
  createPost(post:any){
    return this.http.post(this.BASE_URL+`/api/posts/create`,post,{responseType: 'json'});
  }
  deletePost(post_id:any){
    return this.http.post(this.BASE_URL+`/api/posts/delete/`.concat(post_id),{responseType: 'json'});
  }
  getAllPostsByUser(user_id:any){
    return this.http.get(this.BASE_URL+`/api/posts/all/`.concat(user_id),{responseType:'json'});
  }
  getAllPostsByChannel(channel_id:any){
    return this.http.get(this.BASE_URL+`/api/posts/channel/`.concat(channel_id),{responseType:'json'});
  }
  postAnswer(answer: any){
    return this.http.post(this.BASE_URL+`/api/answer/create`,answer,{responseType:'json'});
  }
  getAllAnswersByPost(post_id:any){
    return this.http.get(this.BASE_URL+`/api/answer/get/`.concat(post_id),{responseType:'json'});
  }
  editPost(editedPost:any){
    return this.http.post(this.BASE_URL+`/api/posts/edit`,editedPost,{responseType:'json'});
  }
  getRecent(){
    return this.http.get(this.BASE_URL+`/api/posts/getRecent`,{responseType:'json'});
  }

}
