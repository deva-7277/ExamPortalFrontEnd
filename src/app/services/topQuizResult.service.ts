// src/app/services/topQuizResult.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class TopQuizResultService {
  constructor(private _http: HttpClient) {}

  // Method to get quiz names
  public getQuizNames(): Observable<any[]> {
    return this._http.get<any[]>(`${baseUrl}/quiz`); // Adjust the endpoint as needed
  }

  // Method to get top quiz results
  public getTopQuizResults(quizId: number, limit: number): Observable<any[]> {
    return this._http.get<any[]>(`${baseUrl}/top-results/quiz/${quizId}?limit=${limit}`);
  }
}
