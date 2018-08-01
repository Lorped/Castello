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

  professioni = [];
  /*profPG = { IDprofessione: 0 , nomeprofessione : '', desc: '0' }; */


  constructor( private schedaService: SchedaService, private status: Status, private pg: Personaggio ) { }

  ngOnInit() {


    this.personaggioForm = new FormGroup ({

      NomePG: new FormControl('', [
        Validators.required,
        Validators.pattern(this.unamePattern)
      ]),
      CognomePG: new FormControl('', [
        Validators.pattern(this.unamePattern)
      ]),
      profPG: new FormControl('', [
        Validators.required,
      ]),
      DescProfessione: new FormControl('', [
        Validators.required,
        Validators.pattern(this.unamePattern)
      ])

    });

    this.schedaService.getprofessioni()
    .subscribe( (data: any) => {
      this.professioni=data;
    });


    this.schedaService.getpg(this.status.IDutente)
    .subscribe( (data: any) => {


      this.personaggioForm.patchValue({
        nomePG: data.NomePG,
        cognomePG: data.CognomePG,
        /*profPG: data.profPG,*/
        DescrProfessione: data.DescrProfessione
      });

      this.URLimg = data.URLimg;
    });
  }


  get NomePG() {
    return this.personaggioForm.get('NomePG');
  }
  get CognomePG() {
    return this.personaggioForm.get('CognomePG');
  }
  get profPG() {
    return this.personaggioForm.get('profPG');
  }
  get DescProfessione() {
    return this.personaggioForm.get('DescProfessione');
  }


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

  updatepg(){
    console.log (this.profPG);
  }


}
