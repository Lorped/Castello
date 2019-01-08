import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedaService } from '../services/scheda.service';
import { Personaggio } from '../services/personaggio.service';
import { Listscan, Listpaired } from '../services/oggetti.service';

@Component({
  selector: 'app-personaggio',
  templateUrl: './personaggio.component.html',
  styleUrls: ['./personaggio.component.css']
})
export class PersonaggioComponent implements OnInit {

  pgcorrente = new Personaggio;
  scancorrenti: Array<Listscan> = [];
  paircorrenti: Array<Listpaired> = [];

  constructor( private schedaService: SchedaService,
      private route: ActivatedRoute, ) { }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');

    this.schedaService.getpgbyID( id)
    .subscribe( (data: any) => {

      this.pgcorrente = data.pg;
      this.scancorrenti = data.scan;
      this.paircorrenti = data.pair;

      this.pgcorrente.Sanita = Number(data.pg.Sanita);
      this.pgcorrente.Miti = Number(data.pg.Miti);
      this.pgcorrente.PF = Number(data.pg.PF);
      //console.log(this.pgcorrente);
      //console.log(this.scancorrenti);
      //console.log(this.paircorrenti);

    });

  }

  menosan() {
    this.schedaService.changesm( this.pgcorrente.IDutente , 'S', '-1')
    .subscribe( (data: any) => {
      this.pgcorrente.Sanita = this.pgcorrente.Sanita - 1;
    });
  }
  piusan() {
    this.schedaService.changesm( this.pgcorrente.IDutente , 'S', '1')
    .subscribe( (data: any) => {
      this.pgcorrente.Sanita = this.pgcorrente.Sanita + 1;
    });
  }
  menomiti() {
    this.schedaService.changesm( this.pgcorrente.IDutente , 'M', '-1')
    .subscribe( (data: any) => {
      this.pgcorrente.Miti = this.pgcorrente.Miti - 1;
    });
  }
  piumiti() {
    this.schedaService.changesm( this.pgcorrente.IDutente , 'M', '1')
    .subscribe( (data: any) => {
      this.pgcorrente.Miti = this.pgcorrente.Miti + 1;
      if (this.pgcorrente.Miti + this.pgcorrente.Sanita > 10 ) { this.pgcorrente.Sanita-- ; }
    });
  }
  menoPF() {
    this.schedaService.changesm( this.pgcorrente.IDutente , 'P', '-1')
    .subscribe( (data: any) => {
      this.pgcorrente.PF = this.pgcorrente.PF - 1;
    });
  }
  piuPF() {
    this.schedaService.changesm( this.pgcorrente.IDutente , 'P', '1')
    .subscribe( (data: any) => {
      this.pgcorrente.PF = this.pgcorrente.PF + 1;
    });
  }

}
