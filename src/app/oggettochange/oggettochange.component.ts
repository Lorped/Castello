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


  oggettipair = [];

  newpairsan = 0 ;
  newpairmiti = 0 ;
  newpairpf = 0 ;
  newpairdescrizione = '';
  newpairselect = 0;

  constructor( private oggettiService: OggettiService, private route: ActivatedRoute, private scheda: SchedaService) { }

  ngOnInit() {

    this.getOggetto();
    this.getProfessioni();
    this.getOggetti();
  }

  getProfessioni(): void {
    const id = +this.route.snapshot.paramMap.get('id');

      this.oggettiService.getprofessionieff( id)
      .subscribe( (data: any) => {
        this.professioni = data;
      });
  }

  getOggetti(): void {
    const id = +this.route.snapshot.paramMap.get('id');

      this.oggettiService.getoggettipair( id)
      .subscribe( (data: any) => {
        this.oggettipair = data;
      });
  }


  getOggetto(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.oggettiService.getoggetto(id)
      .subscribe( (res:any) => {
        this.oggetto = res[0];
        //console.log(res);
      });
  }

  doSave() {
    console.log (this.newpairselect);

    if (this.neweffselect != 0 ) {
      this.oggettiService.addeffetto(this.oggetto.ogg.IDoggetto, this.neweffselect, this.neweffdescrizione, this.neweffsan, this.neweffmiti, this.neweffpf )
      .subscribe( res => {
        this.neweffsan = 0 ;
        this.neweffmiti = 0 ;
        this.neweffpf = 0 ;
        this.neweffdescrizione = '';
        this.neweffselect = 0;
        this.getOggetto();
        this.getProfessioni();
      });
    }

  }



  delEff(id: number) {
    this.oggettiService.canceffetto(id)
    .subscribe( res => {
      this.getOggetto();
      this.getProfessioni();
    });
  }

  delPair(id: number) {
    this.oggettiService.cancpair(id, this.oggetto.ogg.IDoggetto)
    .subscribe( res => {
      this.getOggetto();
      this.getOggetti();
    });
  }


}
