import { Component, OnInit } from '@angular/core';
import { Listscan, Listpaired , Listrisposte, OggettiService } from '../services/index';

@Component({
  selector: 'app-listscan',
  templateUrl: './listscan.component.html',
  styleUrls: ['./listscan.component.css']
})
export class ListscanComponent implements OnInit {

  listascan: Array<Listscan> = [];
  listapaired: Array<Listpaired> = [];
  listrisposte: Array<Listrisposte> = [];
  listenigmi: Array<Listrisposte> = [];
  order = 1;
  propertyName = '';
  propertyName2 = '';
  propertyName3 = '';

  constructor( private oggetti: OggettiService ) { }

  ngOnInit() {
    this.loadData();

    const channel = new window.BroadcastChannel('my-channel2');
      channel.addEventListener('message', (event: any) => {
        console.log("Received message from channel 2:", event.data);
        this.loadData();
    });
      
  }

  loadData() {
    this.oggetti.listscan()
      .subscribe( (res: any) => {
        // console.log(res);
        this.listascan = res.scan;
        this.listapaired = res.paired;
        this.listrisposte = res.risposte;
        this.listenigmi = res.enigmi;

        //console.log(this.listapaired);

        this.listapaired.forEach(element => {
          // Do something with each element
          if (element.nome1 > element.nome2) {
            let x = element.nome1;
            element.nome1 = element.nome2;
            element.nome2 = x;
          }
        });
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

  sortBy2 ( prop: string) {
    this.propertyName2 = prop;
    this.listapaired.sort ( (a, b) => {
      return (a[prop] > b[prop]) ? this.order : (-1) * this.order ;
    });
    this.order = -1 * this.order;

    // console.log(this.order);
  }

  sortBy3 ( prop: string) {
    this.propertyName3 = prop;
    this.listrisposte.sort ( (a, b) => {
      return (a[prop] > b[prop]) ? this.order : (-1) * this.order ;
    });
    this.order = -1 * this.order;

    // console.log(this.order);
  }

}
