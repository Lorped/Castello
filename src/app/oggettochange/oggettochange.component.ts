import { Component, OnInit, ViewChild} from '@angular/core';
import { Oggetto, OggettiService } from '../services/index';
import { SchedaService } from '../services/index';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-oggettochange',
  templateUrl: './oggettochange.component.html',
  styleUrls: ['./oggettochange.component.css']
})
export class OggettochangeComponent implements OnInit {
@ViewChild('oggettoForm', { static: true }) oggettoForm: NgForm;

  oggetto: Oggetto ;
  professioni = [];
  special = [];
  bp = [];

  neweffsan = 0 ;
  neweffmiti = 0 ;
  neweffpf = 0 ;
  neweffdescrizione = '';
  neweffselect = 0;


  neweffsanspec = 0 ;
  neweffmitispec = 0 ;
  neweffpfspec = 0 ;
  neweffdescrizionespec = '';
  neweffselectspec = 0;

  neweffsanbp = 0 ;
  neweffmitibp = 0 ;
  neweffpfbp = 0 ;
  neweffselectbp = 0;
  neweffdescrizionebp = '';


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
    this.getSpecial();
    this.getBP();
    this.getOggetti();
  }

  getProfessioni(): void {
    const id = +this.route.snapshot.paramMap.get('id');

      this.oggettiService.getprofessionieff( id)
      .subscribe( (data: any) => {
        this.professioni = data;
      });
  }

  getSpecial(): void {
    const id = +this.route.snapshot.paramMap.get('id');

      this.oggettiService.getspecialeff( id)
      .subscribe( (data: any) => {
        this.special = data;
      });
  }

  getBP(): void {
    const id = +this.route.snapshot.paramMap.get('id');

      this.oggettiService.getbpeff( id)
      .subscribe( (data: any) => {
        this.bp = data;
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
        this.oggettoForm.form.markAsPristine();
        this.oggettoForm.form.markAsUntouched();
      });
    }

    if (this.neweffselectspec != 0 ) {
      this.oggettiService.addeffettospec(this.oggetto.ogg.IDoggetto, this.neweffselectspec, this.neweffdescrizionespec, this.neweffsanspec, this.neweffmitispec, this.neweffpfspec )
      .subscribe( res => {
        this.neweffsanspec = 0 ;
        this.neweffmitispec = 0 ;
        this.neweffpfspec = 0 ;
        this.neweffdescrizionespec = '';
        this.neweffselectspec = 0;
        this.getOggetto();
        this.getProfessioni();
        this.getSpecial();
        this.oggettoForm.form.markAsPristine();
        this.oggettoForm.form.markAsUntouched();
      });
    }

    if (this.neweffselectbp != 0 ) {
      this.oggettiService.addeffettobp(this.oggetto.ogg.IDoggetto, this.neweffselectbp, this.neweffdescrizionebp, this.neweffsanbp, this.neweffmitibp, this.neweffpfbp )
      .subscribe( res => {
        this.neweffsanbp = 0 ;
        this.neweffmitibp = 0 ;
        this.neweffpfbp = 0 ;
        this.neweffdescrizionebp = '';
        this.neweffselectbp = 0;
        this.getOggetto();
        this.getProfessioni();
        this.getSpecial();
        this.getBP();
        this.oggettoForm.form.markAsPristine();
        this.oggettoForm.form.markAsUntouched();
      });
    }


    if (this.newpairselect != 0 ) {
      this.oggettiService.addpair(this.oggetto.ogg.IDoggetto, this.newpairselect, this.newpairdescrizione, this.newpairsan, this.newpairmiti, this.newpairpf )
      .subscribe( res => {
        this.newpairsan = 0 ;
        this.newpairmiti = 0 ;
        this.neweffpf = 0 ;
        this.newpairdescrizione = '';
        this.newpairselect = 0;
        this.getOggetto();
        this.getOggetti();
        this.oggettoForm.form.markAsPristine();
        this.oggettoForm.form.markAsUntouched();
      });
    }

    this.oggettiService.changebase(this.oggetto.ogg.IDoggetto,
      this.oggetto.ogg.nome, this.oggetto.ogg.descrizione,
      this.oggetto.ogg.basesan, this.oggetto.ogg.basemiti, this.oggetto.ogg.basepf )
    .subscribe( (res) => {
      this.oggettoForm.form.markAsPristine();
      this.oggettoForm.form.markAsUntouched();
    });

    //this.oggettoForm.reset();
    //this.oggettoForm.form.markAsPristine();

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
