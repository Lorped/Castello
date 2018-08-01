import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SchedaService {

  constructor( private http: HttpClient ) { }



  getpg (id: number) {
    //const user = sessionStorage.getItem('CastelloUser') ;
    console.log("here");
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getpg.php?id=' + id );
  }

/*
  addpg (bio: string, descrizione: string) {
    const user = sessionStorage.getItem('CastelloUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/Castello/wsPHP/addbio.php', {
      token: user,
      bio: bio,
      descr: descrizione
    });
  }
*/

  putavatar(fileToUpload: File) {
    const formData: FormData = new FormData();
    const user = sessionStorage.getItem('CastelloUser') ;
    formData.append('token', user);
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/putavatar.php', formData )
      .map(() => { return  true;} )

  }

}
