import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class ResultService {

  constructor(private _http: HttpClient) { }

  public saveResult(result:any){
    return this._http.post(`${baseUrl}/result/save-result/`, result);
  }

  public getResult(userId:any, qId:any){
    return this._http.get(`${baseUrl}/result/get-all-results-of-a-quiz/?userId=${userId}&quizId=${qId}`);
  }

  public getSingleResult(rId:any){
    return this._http.get(`${baseUrl}/result/get-result/?id=${rId}`);
  }

  public getUserAllResults(userId:any){
    return this._http.get(`${baseUrl}/result/all-results-for-a-user/?userId=${userId}`);
  }

  // This is for fetching top all results and showing it to homepage
}
