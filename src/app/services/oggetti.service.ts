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
 IDoggetto: 0 ;
 IDprofessione: 0;
 nomeprofessione: '' ;
 desc: '' ; //da LEFT JOIN
 descrizione: '' ;
 effettomiti: 0 ;
 effettosan: 0 ;
 effettopf: 0 ;
};

export class Oggetto {
  ogg: {
    IDoggetto: 0 ;
    scan: 0;
    nome: '' ;
    descrizione: '' ;
    basemiti: 0 ;
    basesan: 0 ;
    basepf: 0 ;
  } ;
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

  canceffetto (id: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/canceffetto.php?id=' + id );
  }

  cancpair (id1: number, id2: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/cancpair.php?id1=' + id1 + '&id2=' + id2 );
  }

  addeffetto (IDoggetto: number, IDprofessione:number, descrizione:string, effettomiti:number, effettosan:number, effettopf:number) {
    return this.http.post('https://www.roma-by-night.it/Castello/wsPHP/addeffetto.php' , {
      IDoggetto: IDoggetto,
      IDprofessione: IDprofessione,
      descrizione: descrizione,
      effettomiti: effettomiti,
      effettosan: effettosan,
      effettopf: effettopf
    });
  }

  getprofessionieff (id: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getprofessionieff.php?id=' + id );
  }

  getoggettipair (id: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getoggettipair.php?id=' + id );
  }

}
