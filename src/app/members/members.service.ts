import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MembersService {

  private tourn = '/api/tournament';

  constructor(private http: HttpClient) { }

  getTourn(id: number): Observable<Object> {
    return this.http.get(this.tourn + '/id/' + id);
  }

  getMembers(id: number): Observable<Object> {
    return this.http.get(this.tourn + '/members/' + id);
  } 

  delMember(id: number): Observable<Object> {
    return this.http.delete(this.tourn + '/members/' + id);
  } 

  joinToTourn(id: number): Observable<Object> {
    return this.http.post(this.tourn + '/join', {"id": id});
  }
}
