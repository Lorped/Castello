import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


export class Paired  {
 IDoggetto1 = 0 ;
 IDoggetto2 = 0 ;
 desc =  '' ;
 effettopf = 0 ;
 effettomiti = 0 ;
 effettosan = 0 ;
 pdescrizione = '' ;
 IDX = 0;
 nome = '';
};

export class Effetti {
 IDeffetto = 0 ;
 IDoggetto = 0 ;
 IDprofessione = 0;
 nomeprofessione = '' ;
 IDspecial = 0;
 nomespecial = '';
 descrizione = '' ; //da LEFT JOIN
 pdescrizione = '' ;
 effettomiti = 0 ;
 effettosan = 0 ;
 effettopf = 0 ;
 descbp = '' ;
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

export class Magia {
  IDmagia = 0 ;
  IDoggetto = 0 ;
  scan = 0;
  nome = '' ;
  minmiti = 0 ;
  descrizione = '' ;
  basemiti = 0 ;
  basesan = 0 ;
  basepf = 0 ;
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
  nome1 = '';
  nome2 = '';
  data = '';
  NomePG = '';
  CognomePG = '';
};


export class Listmagie  {
  data = '';
  DescEstesa = '';
  compreso = '';
};

export class Listmagiex  {
  data = '';
  DescEstesa = '';
};



@Injectable()
export class OggettiService {

  constructor( private http: HttpClient ) { }


  listoggetti () {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getoggetti.php' );
  }

  listmagie () {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getmagie.php' );
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
  cancbasemagie (id: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/cancbasemagie.php?id=' + id );
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
  addeffettospec (IDoggetto: number, IDspecial:number, descrizione:string, effettosan:number, effettomiti:number, effettopf:number) {
    return this.http.post('https://www.roma-by-night.it/Castello/wsPHP/addeffettospec.php' , {
      IDoggetto: IDoggetto,
      IDspecial: IDspecial,
      descrizione: descrizione,
      effettosan: effettosan,
      effettomiti: effettomiti,
      effettopf: effettopf
    });
  }
  addeffettobp (IDoggetto: number, IDbp:number, descrizione:string, effettosan:number, effettomiti:number, effettopf:number) {
    return this.http.post('https://www.roma-by-night.it/Castello/wsPHP/addeffettobp.php' , {
      IDoggetto: IDoggetto,
      IDbp: IDbp,
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

  addbasemagie (nome:string, descrizione:string, minmiti:number, basesan:number, basemiti:number, basepf:number) {
    return this.http.post('https://www.roma-by-night.it/Castello/wsPHP/addbasemagie.php' , {
      nome: nome,
      descrizione: descrizione,
      minmiti: minmiti,
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
  getspecialeff (id: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getspecialeff.php?id=' + id );
  }
  getbpeff (id: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getbpeff.php?id=' + id );
  }

  getoggettipair (id: number) {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/getoggettipair.php?id=' + id );
  }

  listscan () {
    return this.http.get('https://www.roma-by-night.it/Castello/wsPHP/listscan.php' );
  }

}
