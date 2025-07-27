import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map' ;


@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>('https://www.roma-by-night.it/Castello/wsPHP/login.php', {
      email: email,
      password: password
    });
  }
  loginmaster(email: string, password: string) {
    return this.http.post<any>('https://www.roma-by-night.it/Castello/wsPHP/loginmaster.php', {
      email: email,
      password: password
    });
  }


  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('CastelloUser');
    sessionStorage.removeItem('CastelloMaster');
  }
}
