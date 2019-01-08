import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';




export class Personaggio {
 IDutente = 0 ;
 NomePG = '' ;
 CognomePG = '';
 IDprofessione = 0 ;
 nomeprofessione = ''; //da LEFT JOIN
 DescProfessione = '' ;
 Miti = 0 ;
 Sanita = 0 ;
 PF = 0 ;
 URLimg = '' ;

};




@Injectable()
export class PersonaggioService {

  constructor( private http: HttpClient ) { }


  listpg () {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/listutenti.php' );
  }


}
