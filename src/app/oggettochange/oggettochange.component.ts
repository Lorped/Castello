import { Component, OnInit } from '@angular/core';
import { Oggetto, OggettiService } from '../services/index';
import { SchedaService } from '../services/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oggettochange',
  templateUrl: './oggettochange.component.html',
  styleUrls: ['./oggettochange.component.css']
})
export class OggettochangeComponent implements OnInit {

  oggetto: Oggetto ;
  professioni = [];

  neweffsan = 0 ;
  neweffmiti = 0 ;
  neweffpf = 0 ;
  neweffdescrizione = '';
  neweffselect = 0;

  constructor( private oggettiService: OggettiService, private route: ActivatedRoute, private scheda: SchedaService) { }

  ngOnInit() {
    this.scheda.getprofessioni()
    .subscribe( (data: any) => {
      this.professioni = data;
    });
    this.getOggetto();
  }

  getOggetto(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    //console.log(id);

    this.oggettiService.getoggetto(id)
      .subscribe( (res:any) => {
        this.oggetto = res[0];
        //console.log(res);
      });
  }

  doSave() {
    console.log (this.oggetto.ogg.nome);
    console.log (this.neweffselect);
    console.log (this.neweffdescrizione);
  }

  delEff(id: number) {
    console.log ( "canc "+id);
  }

  delPair(id: number) {
    console.log(this.oggetto);
    console.log ( "canc oggetto1 =" + this.oggetto.ogg.IDoggetto + "oggetto2 = " + id);
  }


}
