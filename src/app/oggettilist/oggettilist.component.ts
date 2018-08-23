import { Component, OnInit } from '@angular/core';
import { Oggetto, OggettiService } from '../services/index';

@Component({
  selector: 'app-oggettilist',
  templateUrl: './oggettilist.component.html',
  styleUrls: ['./oggettilist.component.css']
})





export class OggettilistComponent implements OnInit {



  listaoggetti: Array<Oggetto> = [];

  constructor( private oggetti: OggettiService ) { }

  ngOnInit() {

    this.oggetti.listoggetti()
      .subscribe( res => {
        console.log(res);
      });

  }

}
