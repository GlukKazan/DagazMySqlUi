import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BonusService {

  private url = '/api/bonus'

  constructor(private http: HttpClient) { }

  getBonus(bonus: string): Observable<Object> {
    return this.http.get(this.url + "/" + bonus);
  }

  activateBonus(bonus: string, info: string): Observable<Object> {
    return this.http.put(this.url + '/activate', {"bonus": bonus, "info": info});
  }
}
