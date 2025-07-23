import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personaggio } from '../globals';
import 'rxjs/add/operator/map';



/*
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
 descbp = '' ;
 nomespecial = '';

};
*/



@Injectable()
export class PersonaggioService {

  constructor( private http: HttpClient ) { }


  listpg () {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/listutenti.php' );
  }

  inviamessaggio(payload: any) {
    return this.http.post('https://www.roma-by-night.it/Castello/wsPHP/inviamessaggio.php', payload);
  }

}
