import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable()
export class SignupService {
  constructor(private http: HttpClient) {}

  checkEmail (email: string) {
    interface Ares {
      res: string;
    }
    return this.http
      .get('https://www.roma-by-night.it/Castello/wsPHP/checkemail.php?email=' + email)
      .pipe( map( (data: Ares) => data.res ));
  }


  sendregistra (myobj: any) {
      return this.http.post<any>('https://www.roma-by-night.it/Castello/wsPHP/sendregistra.php', {
        myobj: myobj
      });
  }

}
