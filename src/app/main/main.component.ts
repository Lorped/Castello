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



  constructor( private schedaService: SchedaService, public status: Status, private pg: Personaggio ) { }

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
      specPG: new FormControl('', [
        Validators.required,
      ]),
      DescProfessione: new FormControl('', [
        Validators.required,
        Validators.pattern(this.unamePattern)
      ])

    });

    this.schedaService.getprofessioni()
    .subscribe( (data: any) => {
      this.professioni = data;
      console.log (this.professioni);
    });


    this.schedaService.getpg()
    .subscribe( (data: any) => {


      this.personaggioForm.patchValue({
        NomePG: data.NomePG,
        CognomePG: data.CognomePG,
        profPG: data.IDprofessione,
        specPG: data.IDspecial,
        DescProfessione: data.DescProfessione
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
  get specPG() {
    console.log ( "Specpg-value= " + this.personaggioForm.get('specPG').value );
    return this.personaggioForm.get('specPG');
  }
  get DescProfessione() {
    return this.personaggioForm.get('DescProfessione');
  }


  fileChange(files: FileList) {
    if (files.length > 0) {
      const fileToUpload = files[0];

      this.schedaService.putavatar(fileToUpload)
      .subscribe(res => {
          this.schedaService.getpg()
          .subscribe( (data: any) => {
            this.URLimg = data.URLimg;
          });
      }, error => {
        console.log(error);
      });
    }
  }

  updatepg() {
    this.schedaService.updatepg(this.NomePG.value, this.CognomePG.value, this.profPG.value, this.DescProfessione.value)
    .subscribe( (data: any) => {
      this.personaggioForm.markAsPristine();
    });
  }

  getbonus (p,s) {
    console.log ("p="+p+" s ="+s);
    for ( let i = 0; i < this.professioni[p].spec.length ; i++ ) {
      console.log(this.professioni[p].spec[i].IDspec);
      if ( this.professioni[p].spec[i].IDspecial==s) {
        return this.professioni[p].spec[i].bonus;
      }
    }
    return this.professioni[p].spec[0].bonus;
  }


}
