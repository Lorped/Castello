import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class IntroComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  goLogin() {
    this.router.navigate(['login']);
  }
  goRegister() {
    this.router.navigate(['register']);
  }
  gocustode() {
    this.router.navigate(['loginmaster']);
  }
}
