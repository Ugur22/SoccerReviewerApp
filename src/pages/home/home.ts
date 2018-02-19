import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  providers:[RestProvider],
  templateUrl: 'home.html'
})
export class HomePage {
  players:any[] = [];

  constructor(public events: Events, public navCtrl: NavController, public restProvider: RestProvider) {
    events.subscribe('players:refresh', () => {
      this.getPlayers();
    });
  }

  ngOnInit() {
    this.players = [];
    this.getPlayers();

  }


  // get all players info
  getPlayers() {
    this.restProvider.getPlayers().subscribe(players => {
      this.players = players;
    })
    return this.players;
  }
}
