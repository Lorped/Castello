import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SchedaService } from '../services/index';
import { Status, Personaggio} from '../globals';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  URLimg: string;

  unamePattern = '^[A-Za-zàèìòù \']+$';

  fileToUpload: File = null;

  personaggioForm: FormGroup;



  constructor( private schedaService: SchedaService, private status: Status, private pg: Personaggio ) { }

  ngOnInit() {

    console.log("here1");


    this.schedaService.getpg(this.status.IDutente)
    .subscribe( (data: any) => {
      console.log(data);

      this.pg.NomeGiocatore = data.NomeGiocatore;
      this.pg.NomePg = data.NomePg;
      this.pg.CognomePG = data.CognomePG;
      this.pg.IDprofessione = data.IDprofessione;
      this.pg.DescrProfessione = data.DescrProfessione;

      this.URLimg = data.URLimg;
    });




    this.personaggioForm = new FormGroup ({
      NomeGiocatore: new FormControl(this.pg.NomeGiocatore, [
        Validators.required,
        Validators.pattern(this.unamePattern)
      ]),
      NomePG: new FormControl(this.pg.NomePg, [
        Validators.required,
        Validators.pattern(this.unamePattern)
      ]),
      CognomePG: new FormControl(this.pg.CognomePG, [
        Validators.pattern(this.unamePattern)
      ]),
      DescProfessione: new FormControl(this.pg.DescrProfessione, [
        Validators.pattern(this.unamePattern)
      ])


    });
  }

  get NomeGiocatore() {
    return this.personaggioForm.get('NomeGiocatore');
  }
  get NomePG() {
    return this.personaggioForm.get('NomePG');
  }
  get CognomePG() {
    return this.personaggioForm.get('CognomePG');
  }
  get DescProfessione() {
    return this.personaggioForm.get('DescProfessione');
  }

/*
  fileChange(files: FileList) {
    if (files.length > 0) {
      const fileToUpload = files[0];

      this.schedaService.putavatar(fileToUpload)
      .subscribe(res => {
          this.schedaService.getpg(this.status.IDutente)
          .subscribe( (data: any) => {
            this.URLimg = data.URLimg;
          });
      }, error => {
        console.log(error);
      });
    }
  }
  */

}
