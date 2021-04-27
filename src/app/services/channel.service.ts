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
  
}
