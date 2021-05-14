import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  BASE_URL="http://localhost:8080";
  constructor(private http:HttpClient) { }

  createChannel(channel:any){
    console.log(channel);
    return this.http.post(this.BASE_URL+`/api/channel/create`,channel,{
      responseType: 'text'
    });
  }
  getAll(){
    return this.http.get(this.BASE_URL+`/api/channel/all/`,{responseType: 'json'});
  }
  getAllJoined(user_id:any){
    return this.http.get(this.BASE_URL+`/api/channel/allJoined/`.concat(user_id),{responseType: 'json'});
  }

  getAdminIdFromChannel(channel_id:any){
    return this.http.get(this.BASE_URL+`/api/channel/admin/`.concat(channel_id),{responseType: 'json'});
  }
  getChannelDetails(channel_id:any){
    return this.http.get(this.BASE_URL+`/api/channel/details/`.concat(channel_id),{responseType: 'json'});
  }
  getAllChannelsByUser(user_id:any){
    return this.http.get(this.BASE_URL+`/api/channel/channels/`.concat(user_id),{responseType: 'json'});
  }
  deleteChannel(channel_id:any){
    return this.http.get(this.BASE_URL+`/api/channel/delete/`.concat(channel_id),{responseType:'text'});
  }
  
}
