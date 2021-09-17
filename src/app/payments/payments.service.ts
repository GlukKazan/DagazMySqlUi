import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../interface/payment';

@Injectable()
export class PaymentsService {

  private url = '/api';

  constructor(private http: HttpClient) { }

  getPayments(): Observable<Object> {
    return this.http.get(this.url + '/coupon/payments');
  } 

  savePayment(x: Payment): Observable<Object> {
    return this.http.post(this.url + '/account/coupon', x);
  }
}
