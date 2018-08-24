import { Component, OnInit } from '@angular/core';
import { Oggetto, OggettiService } from '../services/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oggettochange',
  templateUrl: './oggettochange.component.html',
  styleUrls: ['./oggettochange.component.css']
})
export class OggettochangeComponent implements OnInit {

  oggetto: Oggetto ;

  constructor( private oggetti: OggettiService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.getOggetto();
  }

  getOggetto(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    //console.log(id);

    this.oggetti.getoggetto(id)
      .subscribe( (res:any) => {
        this.oggetto = res[0];
        //console.log(res);
      });
  }


}
