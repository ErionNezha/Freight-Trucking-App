import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  customer_id: any;
  country_no: any;

  private httpClient: HttpClient;

  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.getvalues();
    this.httpClient = new HttpClient(handler);
  }

  getvalues() {
    this.customer_id = localStorage.getItem('customer_id');
    this.country_no = localStorage.getItem('country_no');
  }

  post_form(body: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.form}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
        body
      )
      .pipe(
        map((m) => {
          let data = m.data;
          let msg = m.message;
          return [data, msg];
        })
      );
  }

  post_address_form(body: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.address_form}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
        body
      )
      .pipe(
        map((m) => {
          let data = m.data;
          let msg = m.message;
          return [data, msg];
        })
      );
  }

  post_stepper_form(body: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.stepper_form}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
        body
      )
      .pipe(
        map((m) => {
          let data = m.data;
          let msg = m.message;
          return [data, msg];
        })
      );
  }

  get_auditTrail(type: any): Observable<any> {
    return this.http
      .get<any>(
        `${environment.audit_trail}?country_no=${this.country_no}&customer_id=${this.customer_id}&type=${type}`
      )
      .pipe(
        map((m) => {
          let data = m.data;
          let msg = m.message;
          return [data, msg];
        })
      );
  }


  
}
