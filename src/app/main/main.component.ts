import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SchedaService } from '../services/index';
import { Status, Personaggio} from '../globals';
import { Router } from '@angular/router';

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
  xspecial = [];

  checkbonus = [ 0 , 0 , 0 ];
  checked = 0;
  checkvalue = 0;

  changecheck=0;

  minDate: Date;
  maxDate: Date;

  colors = [ "", "", "" ];

  constructor( private schedaService: SchedaService, public status: Status, private pg: Personaggio , private router: Router) { }

  ngOnInit() {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90, 0, 1);
    this.maxDate = new Date(currentYear - 16, 11, 31);

    this.personaggioForm = new FormGroup ({

      NomePG: new FormControl('', [
        Validators.required,
        Validators.pattern(this.unamePattern)
      ]),
      CognomePG: new FormControl('', [
        Validators.pattern(this.unamePattern)
      ]),
      DataNascita: new FormControl('', [
        Validators.required
      ]),
      profPG: new FormControl('', [
        Validators.required
      ]),
      specPG: new FormControl('', [
        Validators.required
      ]),
      

      xspecPG: new FormControl('', []),

    });

    this.schedaService.getprofessioni()
    .subscribe( (data: any) => {
      this.professioni = data;

    });

    this.schedaService.getxspecial()
    .subscribe( (data: any) => {
      this.xspecial = data;
    });

  

    this.schedaService.getpg()
    .subscribe( (data: any) => {


      this.personaggioForm.patchValue({
        NomePG: data.NomePG,
        CognomePG: data.CognomePG,
        profPG: data.IDprofessione,
        specPG: data.IDspecial,
        //aaaaPG: data.aaaa,
        //mmPG: data.mm,
        //ggPG: data.gg,
        xspecPG: data.xspecpg,
        DataNascita: new Date(data.aaaa, data.mm - 1, data.gg)
      });

      this.URLimg = data.URLimg;
      this.checkvalue=data.IDbp;
      if (this.checkvalue != 0 ) {
        let xx = (data.IDbp-1)-3*Math.floor((data.IDbp-1)/3);
        this.checkbonus[xx]=1;
        this.colors[xx]="primary";
        this.checked=1;
        this.checkvalue=data.IDbp;
      }

    });

    //console.log(this.specPG);
    this.onChanges();
  }

  onChanges(): void {
    this.personaggioForm.get('profPG').valueChanges.subscribe(val => {

      //console.log("here");

      this.checkbonus[0] = 0;
      this.checkbonus[1] = 0;
      this.checkbonus[2] = 0;
      this.colors[0]="";
      this.colors[1]="";
      this.colors[2]="";
      this.checked = 0;
      this.changecheck = 0;
      this.personaggioForm.patchValue({
        specPG: null,
        xspecPG: 0
      });
    });
  }

  get NomePG() {
    return this.personaggioForm.get('NomePG');
  }
  get CognomePG() {
    return this.personaggioForm.get('CognomePG');
  }
  get DataNascita() {
    return this.personaggioForm.get('DataNascita');
  }
  get profPG() {
    return this.personaggioForm.get('profPG');
  }
  get specPG() {
    return this.personaggioForm.get('specPG');
  }
  get xspecPG() {
    return this.personaggioForm.get('xspecPG');
  }





  fileChange(event: any) {
    const files: FileList = event.target.files;

    if (files.length > 0) {
      const fileToUpload = files[0];

      this.schedaService.putavatar(fileToUpload)
      .subscribe(res => {
          this.schedaService.getpg()
          .subscribe( (data: any) => {
            const xx = Date.now();
            this.URLimg = data.URLimg+'?'+xx;
          });
      }, error => {
        console.log(error);
      });
    }
  }

  updatepg() {
    let xpg=0;
    if (this.specPG.value == 17 ) {  /*** studente ***/
      xpg = this.xspecPG.value;
    }
    var aaaa = this.DataNascita.value.getFullYear();
    var mm = this.DataNascita.value.getMonth() + 1;
    var gg = this.DataNascita.value.getDate();
    this.schedaService.updatepg(this.NomePG.value, this.CognomePG.value, this.profPG.value, this.specPG.value, this.checkvalue, aaaa, mm, gg , xpg)
    .subscribe( (data: any) => {
      this.personaggioForm.markAsPristine();
      this.changecheck=0;
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

    this.changecheck=1;

    //console.log("docheck ", i);
    this.colors[0]="";
    this.colors[1]="";
    this.colors[2]="";
    this.colors[i]="primary";
  }

  logout(){
    this.router.navigate(['login']);
  }

}
