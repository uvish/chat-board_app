import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JoinService {

  constructor(private http:HttpClient) { }
  getStatus(join_request:any){
    return this.http.post(`http://localhost:8080/api/join/status`,join_request,{responseType:'text'});
  }
  requestJoin(join_request:any){
    return this.http.post(`http://localhost:8080/api/join/join_request`,join_request,{responseType:'json'});
  }
  getAllRequests(admin_id:any){
    return this.http.get(`http://localhost:8080/api/join/getAllRequests/`.concat(admin_id),{responseType:'json'});
  }
  acceptRequest(request_id:any){
    return this.http.get(`http://localhost:8080/api/join/approve/`.concat(request_id),{responseType:'text'});
  }
  denyRequest(request_id:any){
    return this.http.get(`http://localhost:8080/api/join/deny/`.concat(request_id),{responseType:'text'});
  }
}
