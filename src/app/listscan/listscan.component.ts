import { Component, OnInit } from '@angular/core';
import { Listscan, Listpaired , OggettiService } from '../services/index';

@Component({
  selector: 'app-listscan',
  templateUrl: './listscan.component.html',
  styleUrls: ['./listscan.component.css']
})
export class ListscanComponent implements OnInit {

  listascan: Array<Listscan> = [];
  listapaired: Array<Listpaired> = [];
  order = 1;
  propertyName = '';

  constructor( private oggetti: OggettiService ) { }

  ngOnInit() {
    this.oggetti.listscan()
      .subscribe( (res: any) => {
        // console.log(res);
        this.listascan = res.scan;
        this.listapaired = res.paired;
      });
  }
  sortBy ( prop: string) {
    this.propertyName = prop;
    this.listascan.sort ( (a, b) => {
      return (a[prop] > b[prop]) ? this.order : (-1) * this.order ;
    });
    this.order = -1 * this.order;

    // console.log(this.order);
  }
}
