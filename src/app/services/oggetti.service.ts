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
 descrizione: '' ; //da LEFT JOIN
 pdescrizione: '' ;
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

export class Listscan  {
  IDutente: 0;
  IDoggetto: 0;
  data: '';
  NomePG: '';
  CognomePG: '';
  Miti: 0;
  Sanita: 0;
  nome: '';  //nome Oggetto
  nomeprofessione: ''; //classe prof
};

export class Listpaired  {
  nome1: '';
  nome2: '';
  data: '';
  NomePG: '';
  CognomePG: '';
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

  cancbase (id: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/cancbase.php?id=' + id );
  }

  cancpair (id1: number, id2: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/cancpair.php?id1=' + id1 + '&id2=' + id2 );
  }

  addeffetto (IDoggetto: number, IDprofessione:number, descrizione:string, effettosan:number, effettomiti:number, effettopf:number) {
    return this.http.post('https://www.roma-by-night.it/Castello/wsPHP/addeffetto.php' , {
      IDoggetto: IDoggetto,
      IDprofessione: IDprofessione,
      descrizione: descrizione,
      effettosan: effettosan,
      effettomiti: effettomiti,
      effettopf: effettopf
    });
  }

  addbase (nome:string, descrizione:string, basesan:number, basemiti:number, basepf:number) {
    return this.http.post('https://www.roma-by-night.it/Castello/wsPHP/addbase.php' , {
      nome: nome,
      descrizione: descrizione,
      basesan: basesan,
      basemiti: basemiti,
      basepf: basepf
    });
  }


  changebase (IDoggetto: number, nome:string, descrizione:string, basesan:number, basemiti:number,  basepf:number) {
    return this.http.post('https://www.roma-by-night.it/Castello/wsPHP/changebase.php' , {
      IDoggetto: IDoggetto,
      nome: nome,
      descrizione: descrizione,
      basesan: basesan,
      basemiti: basemiti,
      basepf: basepf
    });
  }


  addpair (IDoggetto1: number, IDoggetto2:number, descrizione:string, effettosan:number, effettomiti:number, effettopf:number) {
    return this.http.post('https://www.roma-by-night.it/Castello/wsPHP/addpair.php' , {
      IDoggetto1: IDoggetto1,
      IDoggetto2: IDoggetto2,
      descrizione: descrizione,
      effettosan: effettosan,
      effettomiti: effettomiti,
      effettopf: effettopf
    });
  }

  getprofessionieff (id: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getprofessionieff.php?id=' + id );
  }

  getoggettipair (id: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getoggettipair.php?id=' + id );
  }

  listscan () {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/listscan.php' );
  }

}
