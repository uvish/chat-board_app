import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  constructor(private http:HttpClient) { }

  createChannel(channel:any){
    console.log(channel);
    return this.http.post(`http://localhost:8080/api/channel/create`,channel,{
      responseType: 'text'
    });
  }
  getAll(){
    return this.http.get(`http://localhost:8080/api/channel/all`,{responseType: 'json'});
  }

  getAdminIdFromChannel(channel_id:any){
    return this.http.get(`http://localhost:8080/api/channel/admin/`.concat(channel_id),{responseType: 'json'});
  }
  getChannelDetails(channel_id:any){
    return this.http.get(`http://localhost:8080/api/channel/details/`.concat(channel_id),{responseType: 'json'});
  }
  getAllChannelsByUser(user_id:any){
    return this.http.get(`http://localhost:8080/api/channel/channels/`.concat(user_id),{responseType: 'json'});
  }
  
}
