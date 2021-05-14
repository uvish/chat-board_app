import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JoinService {
  BASE_URL="http://localhost:8080";
  constructor(private http:HttpClient) { }
  getStatus(join_request:any){
    return this.http.post(this.BASE_URL+`/api/join/status`,join_request,{responseType:'text'});
  }
  requestJoin(join_request:any){
    return this.http.post(this.BASE_URL+`/api/join/join_request`,join_request,{responseType:'json'});
  }
  getAllRequests(admin_id:any){
    return this.http.get(this.BASE_URL+`/api/join/getAllRequests/`.concat(admin_id),{responseType:'json'});
  }
  acceptRequest(request_id:any){
    return this.http.get(this.BASE_URL+`/api/join/approve/`.concat(request_id),{responseType:'text'});
  }
  denyRequest(request_id:any){
    return this.http.get(this.BASE_URL+`/api/join/deny/`.concat(request_id),{responseType:'text'});
  }
}
