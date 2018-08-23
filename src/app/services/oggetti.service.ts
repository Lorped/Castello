import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


export class Paired  {
 IDoggetto1: 0 ;
 IDoggetto2: 0 ;
 desc: '' ;
};

export class Effetti {
 IDeffetto: 0 ;
 nomeprofessione: '' ;
 descrizione: '' ;
 effettomiti: 0 ;
 effettosan: 0 ;
 effettopf: 0 ;
};

export class Oggetto {
 IDoggetto: 0 ;
 nome: '' ;
 descrizione: '' ;
 basemiti: 0 ;
 basesan: 0 ;
 basepf: 0 ;
 eff: Array <Effetti> = [];
 pair: Array<Paired> = [];
};



@Injectable()
export class OggettiService {

  constructor( private http: HttpClient ) { }


  listoggetti () {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getoggetti.php' );
  }

  getoggetto (id: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getoggetti.php?id=' + id );
  }

}
