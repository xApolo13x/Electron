import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../shared/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  public authenticateUser(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/authenticate`, user);
  }

  //login and set the token in the localStorage
  public loginUser(accessToken: string) {
    localStorage.setItem('token', accessToken);
    return true;
  }

  //check the token
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

// let token = localStorage.getItem('token');
// let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));

// console.log('name: ' + decodedJWT.name);
// console.log('role: ' + decodedJWT.role);

  //We close the session and remove the token from localStorage
  
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser() {
    return this.http.get(`${environment.apiUrl}/api/current-user`);
  }

}
