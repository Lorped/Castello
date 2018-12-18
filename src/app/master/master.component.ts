import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotostat() {
    this.router.navigate(['stat']);
  }
  gotooggetti() {
    this.router.navigate(['oggettilist']);
  }
  gotopg() {
    this.router.navigate(['personaggilist']);
  }
}
