import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Approval, Register } from '../../models/auth.model';
import { environment } from 'environments/environment.prod';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(payload: Register) {
    return this.http
      .post<Register>(`${environment.baseUrl}/register`, payload)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  dataCheck() {
    return this.http.get<any>(`${environment.baseUrl}/register`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  login() {
    return this.http.get<any>(`${environment.baseUrl}/register`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
