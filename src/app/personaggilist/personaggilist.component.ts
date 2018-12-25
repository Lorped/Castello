import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personaggio, PersonaggioService } from '../services/index';

@Component({
  selector: 'app-personaggilist',
  templateUrl: './personaggilist.component.html',
  styleUrls: ['./personaggilist.component.css']
})
export class PersonaggilistComponent implements OnInit {

  listapg: Array<Personaggio> = [];
  order = 1;
  propertyName = '';

  constructor( private personaggi: PersonaggioService ) { }

  ngOnInit() {
    this.personaggi.listpg()
      .subscribe( (res: any) => {
        //console.log(res);
        this.listapg = res;
      });
  }
  sortBy ( prop: string) {
    this.propertyName = prop;
    this.listapg.sort ( (a, b) => {
      return (a[prop] > b[prop]) ? this.order : (-1) * this.order ;
    });
    this.order = -1 * this.order;

    // console.log(this.order);
  }
}
