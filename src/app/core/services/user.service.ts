import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/app/shared/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public addUser(user: any) {
    return this.httpClient.post(`${environment.apiUrl}/api/users`, user);
  }
}
