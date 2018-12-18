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

  constructor( private personaggi: PersonaggioService ) { }

  ngOnInit() {
    this.personaggi.listpg()
      .subscribe( (res: any) => {
        //console.log(res);
        this.listapg = res;
      });
  }

}
