import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { Approval } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http
      .get<any>(`${environment.baseUrl}/register`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  approveUser(payload: Approval, id: string) {
    return this.http
      .put<Approval>(`${environment.baseUrl}/register/${id}`, payload)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }


  deleteUser(id: string) {
    return this.http
      .delete<Approval>(`${environment.baseUrl}/register/${id}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

}
