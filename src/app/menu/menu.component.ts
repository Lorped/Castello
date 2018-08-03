import { Component, OnInit  } from '@angular/core';

import { ModalService } from '../services/index';
import { AuthenticationService } from '../services/index';

import { Router } from '@angular/router';

import { Status } from '../globals';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService, private router: Router,
    public status: Status , private modalService: ModalService ) { }

  ngOnInit() {
  }





  dologout() {
    this.status.menuState = 'out';
    this.status.IDutente = 0;
    this.authenticationService.logout();
    this.router.navigate(['']);

  }


  closemenu() {
    this.status.menuState = 'out';
  }


  openmodal(id: string ) {
    if ( id === 'modalregolamento') {
      this.status.regolamentoon = true ;
    }
    if ( id === 'modalnews') {
      this.status.newson = true ;
    }

    this.status.menuState = 'out';
    this.modalService.show(id) ;
  }


  gotomodule(where: string) {
    this.status.menuState = 'out';
    this.router.navigate([where]);
  }

}
