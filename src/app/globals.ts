import { Injectable } from '@angular/core';




@Injectable()
export class Status {

  menuState = 'out';
  regolamentoon = false;
  newson = false;
  IDutente = 0 ;

}

@Injectable()
export class Personaggio {

  IDutente = 0;
  NomeGiocatore = '';
  NomePG = '';
  CognomePG = '';
  IDprofessione = 0;
  IDspec = 0;
  IDbp = 0;
  //DescrProfessione = '';
  IDspecial = 0;
  nomeprofessione = '';
  nomespecial = '';
  descbp = '';
  Miti = 0;
  Sanita = 10;
  PF = 10;
  gg = '1';
  mm = '1';
  aaaa = 1970;
  URLimg = '' ;
  xbonus = '';
  bonus = '';
  xspecpg = 0;
  gruppo = 0;
  selected = false;

}


export class Statistica {

  n = '';
  c = 0;
  perc = 0;

}
