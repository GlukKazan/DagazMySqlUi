import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tourn } from '../interface/tourn';

@Injectable()
export class TournService {

  private tourn = '/api/tournament';

  constructor(private http: HttpClient) { }
  
  getInfo(): Observable<Object> {
    return this.http.get(this.tourn + '/info');
  } 

  getTime(): Observable<Object> {
    return this.http.get(this.tourn + '/time');
  } 

  getTourns(url: string): Observable<Object> {
    return this.http.get(this.tourn + '/' + url);
  } 

  saveTourn(x: Tourn): Observable<Object> {
    return this.http.post(this.tourn, x);
  }

  joinToTourn(id: number): Observable<Object> {
    return this.http.post(this.tourn + '/join', {"id": id});
  }

  delTourn(id: number): Observable<Object> {
    return this.http.delete(this.tourn + '/' + id);
  }

  closeTourn(id: number): Observable<Object> {
    return this.http.post(this.tourn + '/close', {"id": id});
  }
}
