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


  URLimg: string = 'nopicture.gif';

  unamePattern = '^[A-Za-zàèìòù \']+$';
  today: number = (new Date()).getFullYear();

  fileToUpload: File = null;

  personaggioForm: FormGroup;

  professioni = [];

  checkbonus = [ 0 , 0 , 0 ];
  checked = 0;
  checkvalue = 0;


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
      ggPG: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(31)
      ]),
      mmPG: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(12)
      ]),
      aaaaPG: new FormControl('', [
        Validators.required,
        Validators.min(1900),
        Validators.max(this.today - 16)
      ])

    });

    this.schedaService.getprofessioni()
    .subscribe( (data: any) => {
      this.professioni = data;

    });


    this.schedaService.getpg()
    .subscribe( (data: any) => {


      this.personaggioForm.patchValue({
        NomePG: data.NomePG,
        CognomePG: data.CognomePG,
        profPG: data.IDprofessione,
        specPG: data.IDspecial,
        aaaaPG: data.aaaa,
        mmPG: data.mm,
        ggPG: data.gg
      });

      this.URLimg = data.URLimg;
      this.checkvalue=data.IDbp;
      if (this.checkvalue != 0 ) {
        let xx = (data.IDbp-1)-3*Math.floor((data.IDbp-1)/3);
        this.checkbonus[xx]=1;
        this.checked=1;
        this.checkvalue=data.IDbp;
      }

    });

    this.onChanges();
  }

  onChanges(): void {
    this.personaggioForm.get('profPG').valueChanges.subscribe(val => {

      this.checkbonus[0] = 0;
      this.checkbonus[1] = 0;
      this.checkbonus[2] = 0;
      this.checked = 0;
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
    return this.personaggioForm.get('specPG');
  }
  get aaaaPG() {
    return this.personaggioForm.get('aaaaPG');
  }
  get mmPG() {
    return this.personaggioForm.get('mmPG');
  }
  get ggPG() {
    return this.personaggioForm.get('ggPG');
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
    this.schedaService.updatepg(this.NomePG.value, this.CognomePG.value, this.profPG.value, this.specPG.value, this.checkvalue, this.aaaaPG.value, this.mmPG.value, this.ggPG.value)
    .subscribe( (data: any) => {
      this.personaggioForm.markAsPristine();
    });
  }

  getbonus (p,s) {

    for ( let i = 0; i < this.professioni[p].spec.length ; i++ ) {
      if ( this.professioni[p].spec[i].IDspecial==s) {
        return this.professioni[p].spec[i].bonus;
      }
    }
    return this.professioni[p].spec[0].bonus;
  }

  docheck(i) {
    this.checkbonus[0] = 0;
    this.checkbonus[1] = 0;
    this.checkbonus[2] = 0;
    this.checkbonus[i] = 1;
    this.checked = 1;
    this.checkvalue = this.professioni[this.profPG.value-1].bonus[i].IDbp;

  }


}
