import { Component, OnInit } from '@angular/core';
import { Oggetto, OggettiService } from '../services/index';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-oggettilist',
  templateUrl: './oggettilist.component.html',
  styleUrls: ['./oggettilist.component.css']
})





export class OggettilistComponent implements OnInit {



  listaoggetti: Array<Oggetto> = [];

  listafissomobile: { id: string, nome: string, def: boolean }[] = [
    {id: 'f', nome: 'Fisso', def: true} ,
    {id: 'm', nome: 'Mobile', def: false} ,
    {id: 'e', nome: 'Enigma', def: false} 
  ];

  fissomobile = 'f';

  
  newnome = '';
  newdescrizione = '';
  newbasesan = 0 ;
  newbasemiti = 0 ;
  newbasepf = 0 ;



  constructor( private oggetti: OggettiService ) { }

  ngOnInit() {

    this.caricaoggetti();

  }

  caricaoggetti() {
    this.oggetti.listoggetti()
      .subscribe( (res: any) => {
        //console.log(res);
        this.listaoggetti = res;
      });
  }

  doSave() {
    this.oggetti.addbase(this.newnome, this.newdescrizione, this.newbasesan, this.newbasemiti, this.newbasepf, this.fissomobile)
    .subscribe( res => {
      this.newnome = '';
      this.newdescrizione = '';
      this.newbasesan = 0 ;
      this.newbasemiti = 0 ;
      this.newbasepf = 0 ;
      this.fissomobile = 'f';
      this.caricaoggetti();
    });
  }

  cancbase(id: number) {
    this.oggetti.cancbase(id)
    .subscribe( res => {
      this.caricaoggetti();
    });

  }

  openstampaoggetti() {
    var win = window.open("wsPHP/stampaoggetti.php", '_blank');
    win.focus();
  }


}
