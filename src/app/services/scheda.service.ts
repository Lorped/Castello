import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SchedaService {

  constructor( private http: HttpClient ) { }



  getpg () {
    const user = sessionStorage.getItem('CastelloUser') ;
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getpg.php?id=' + user );
  }

  getprofessioni () {

    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getprofessioni.php' );
  }


  updatepg (aNomePG: string, aCognomePG: string, aIDprofessione: number, aDescProfessione: string) {
    const user = sessionStorage.getItem('CastelloUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/Castello/wsPHP/addpg.php', {
      token: user,
      NomePG: aNomePG,
      CognomePG: aCognomePG,
      IDprofessione: aIDprofessione,
      DescProfessione: aDescProfessione
    });
  }


  putavatar(fileToUpload: File) {
    const formData: FormData = new FormData();
    const user = sessionStorage.getItem('CastelloUser') ;
    formData.append('token', user);
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post('https://www.roma-by-night.it/Castello/wsPHP/putavatar.php', formData )
      .map(() => { return  true; } );

  }

}
