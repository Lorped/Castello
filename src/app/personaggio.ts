export class Attributi {
  idattributo: number;
  nomeattributo: string;
  valore: number;
}
export class Abilita {
  idabilita: number;
  nomeabilita: string;
  valore: number;
}
export class Personaggio {
  idpersonaggio: number;
  nomepersonaggio: string;
  idprofessione: number;
  nomeprofessione: string;
  listaattributi: Attributi[];
  listaabilita: Abilita[];
  sanita: number;
  miti: number;
}
