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

  //login and set the token in the sessionStorage
  public loginUser(accessToken: string) {
    sessionStorage.setItem('token', accessToken);
    return true;
  }

  //check the token
  public isLoggedIn() {
    let tokenStr = sessionStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return true;
  }

  public getToken() {
    return sessionStorage.getItem('token');
  }

  public setUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = sessionStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    const token = this.getToken();

    if (token) {
      const decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      const perm = decodedJWT.roles;
      return perm;

    } else {
      console.log("An error occurred while retrieving user role. Please try again later or contact support.")
      return null;
    }
  }
}
