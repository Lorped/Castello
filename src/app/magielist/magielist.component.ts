import { Component, OnInit } from '@angular/core';
import { Magia, OggettiService } from '../services/index';

@Component({
  selector: 'app-magielist',
  templateUrl: './magielist.component.html',
  styleUrls: ['./magielist.component.css']
})
export class MagielistComponent implements OnInit {


  listaoggetti: Array<Magia> = [];

  newnome = '';
  newdescrizione = '';
  newminmiti = 10;
  newbasesan = 0 ;
  newbasemiti = 0 ;
  newbasepf = 0 ;

  constructor( private oggetti: OggettiService ) { }

  ngOnInit() {

    this.caricaoggetti();

  }

  caricaoggetti() {
    this.oggetti.listmagie()
      .subscribe( (res: any) => {
        //console.log(res);
        this.listaoggetti = res;
      });
  }

  doSave() {
    this.oggetti.addbasemagie(this.newnome, this.newdescrizione, this.newminmiti, this.newbasesan, this.newbasemiti, this.newbasepf)
    .subscribe( res => {
      this.newnome = '';
      this.newdescrizione = '';
      this.newminmiti = 10;
      this.newbasesan = 0 ;
      this.newbasemiti = 0 ;
      this.newbasepf = 0 ;
      this.caricaoggetti();
    });
  }

  cancbase(id: number) {
    this.oggetti.cancbasemagie(id)
    .subscribe( res => {
      this.caricaoggetti();
    });

  }

  openstampaoggetti() {
    var win = window.open("wsPHP/stampamagie.php", '_blank');
    win.focus();
  }

}
