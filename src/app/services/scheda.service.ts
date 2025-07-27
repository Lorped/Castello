import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';


@Injectable()
export class SchedaService {

  constructor( private http: HttpClient ) { }



  getpg () {
    const user = sessionStorage.getItem('CastelloUser') ;
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getpg.php?id=' + user );
  }

  getpgbyID (id: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getpgbyid.php?id=' + id );
  }

  getprofessioni () {

    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getprofessioni.php' );
  }

  getxspecial () {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getxspecial.php' );
  }


  changesm (id: number, cosa: string, delta: string ) {

    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/changesm.php?id=' + id + '&sm=' + cosa + '&delta=' + delta);
  }



  updatepg (aNomePG: string, aCognomePG: string, aIDprofessione: number, aIDspecial: number, aIDbp:number, aaa: number, amm:number, agg: number, xpg: number) {
    const user = sessionStorage.getItem('CastelloUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/Castello/wsPHP/addpg.php', {
      token: user,
      NomePG: aNomePG,
      CognomePG: aCognomePG,
      IDprofessione: aIDprofessione,
      IDspecial: aIDspecial,
      IDbp: aIDbp,
      aaaa: aaa,
      mm: amm,
      gg: agg,
      xpg: xpg
    });
  }


  putavatar(fileToUpload: File) {
    const formData: FormData = new FormData();
    const user = sessionStorage.getItem('CastelloUser') ;
    formData.append('token', user);
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post('https://www.roma-by-night.it/Castello/wsPHP/putavatar.php', formData );

  }

}
