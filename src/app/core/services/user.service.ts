import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/shared/environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public createUser(user: User) {
    return this.httpClient.post(`${environment.apiUrl}/user`, user);
  }

  public getListUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/user`);
  }

}
