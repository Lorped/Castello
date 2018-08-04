import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Statistica } from '../globals';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})



export class StatComponent implements OnInit {

  stat: Array<Statistica> = [];
  registrati = 0;
  iscritti = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://www.roma-by-night.it/Castello/wsPHP/stat.php' )
    .subscribe ( (res: any) => {
      this.registrati = res.registrati;
      this.iscritti = res.iscritti;
      this.stat=res.stat;
    });
  }

}
