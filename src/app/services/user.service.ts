import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUser(username: any): any {
    return this.http.get(`${baseUrl}/user/${username}`)
  }

  constructor(private http: HttpClient) {

   }

  public addUser(user:FormData){
    return this.http.post(`${baseUrl}/user/`, user);
  }

}
