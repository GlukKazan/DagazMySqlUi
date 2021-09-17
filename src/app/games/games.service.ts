import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GamesService {

  private tourn = '/api/tournament';
  private styles = '/api/game/styles';
  private sess = '/api/session';
  private join = '/api/join';

  constructor(private http: HttpClient) { }
  
  getTourn(id: number): Observable<Object> {
    return this.http.get(this.tourn + '/id/' + id);
  }

  getStyles(): Observable<Object> {
    return this.http.get(this.styles);
  } 

  getSessions(url: string): Observable<Object> {
    return this.http.get(this.sess + '/tournament/' + url);
  } 

  joinToSession(sid: number): Observable<Object> {
    return this.http.post(this.join, {"session_id": sid});
  }
  
  delSessions(id: number): Observable<Object> {
    return this.http.delete(this.sess + '/' + id);
  } 
}
