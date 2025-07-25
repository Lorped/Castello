import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  PersonaggioService } from '../services/index';
import { Personaggio } from '../globals';

@Component({
  selector: 'app-personaggilist',
  templateUrl: './personaggilist.component.html',
  styleUrls: ['./personaggilist.component.css']
})
export class PersonaggilistComponent implements OnInit {

  listapg: Array<Personaggio> = [];
  order = 1;
  propertyName = '';

  allchecked = false;
  partialChecked = false;

  messaggio = '';
  link = '';

  constructor( private personaggi: PersonaggioService ) { }

  ngOnInit() {
    this.personaggi.listpg()
      .subscribe( (res: any) => {
        //console.log(res);
        this.listapg = res;

        for (let i = 0; i < this.listapg.length; i++) {
          this.listapg[i].selected = false;
        }
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

  checked(item: Personaggio) {
    
    item.selected = !item.selected;

    //console.log(item.NomePG , item.selected);
    // Handle checkbox change event
    if (item.selected) {
      this.partialChecked = false;
      this.allchecked = true;
      for (let i = 0; i < this.listapg.length; i++) {
        if (!this.listapg[i].selected) {
          this.partialChecked = true;
          this.allchecked = false;
          break;
        }
      }
    } else {
      this.allchecked = false;
      this.partialChecked = false;
        for (let i = 0; i < this.listapg.length; i++) {
        if (this.listapg[i].selected) {
          this.partialChecked = true;
          break;
        }
      }
    }
  }
  doallchecked(){
    this.allchecked = !this.allchecked;
    this.partialChecked = false;

    for (let i = 0; i < this.listapg.length; i++) {
      this.listapg[i].selected = this.allchecked;
    }
  }


  inviamessaggio(){
    if (this.messaggio.trim() === '') {
      return;
    }

    const selectedCharacters = this.listapg.filter(item => item.selected);
    if (selectedCharacters.length === 0) {
      return;
    }

    const payload = {
      messaggio: this.messaggio,
      link: this.link,
      personaggi: selectedCharacters
    };

    this.personaggi.inviamessaggio(payload)
      .subscribe(response => {
        console.log('Messaggio inviato con successo:', response);
        this.messaggio = '';
        this.link = '';
        this.allchecked = false;
        this.partialChecked = false;
        this.listapg.forEach(item => item.selected = false);
      }, error => {
        console.error('Errore durante l\'invio del messaggio:', error);
      });
  }

}
