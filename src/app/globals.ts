import { Injectable } from '@angular/core';




@Injectable()
export class Status {

  menuState = 'out';
  regolamentoon = false;
  newson = false;
  IDutente = 0 ;

}

export class Personaggio {

  IDutente = 0;
  NomeGiocatore = '';
  NomePg = '';
  CognomePG = '';
  IDprofessione = 0;
  DescrProfessione = '';
  Miti = 0;
  Sanita = 10;
  PF = 10;

}


export class Statistica {

  n = '';
  c = 0;
  perc = 0;

}
