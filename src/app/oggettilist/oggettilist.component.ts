import { Component, OnInit } from '@angular/core';
import { Oggetto, OggettiService } from '../services/index';

@Component({
  selector: 'app-oggettilist',
  templateUrl: './oggettilist.component.html',
  styleUrls: ['./oggettilist.component.css']
})





export class OggettilistComponent implements OnInit {



  listaoggetti: Array<Oggetto> = [];

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
    this.oggetti.addbase(this.newnome, this.newdescrizione, this.newbasesan, this.newbasemiti, this.newbasepf)
    .subscribe( res => {
      this.newnome = '';
      this.newdescrizione = '';
      this.newbasesan = 0 ;
      this.newbasemiti = 0 ;
      this.newbasepf = 0 ;
      this.caricaoggetti();
    });
  }

  cancbase(id: number) {
    this.oggetti.cancbase(id)
    .subscribe( res => {
      this.caricaoggetti();
    });

  }

}
