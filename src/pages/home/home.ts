import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  providers:[RestProvider],
  templateUrl: 'home.html'
})
export class HomePage {
  players:any[] = [];

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
  }

  ngOnInit() {
    this.players = [];
    this.getPlayers();

  }


  getPlayers() {
    this.restProvider.getPlayers().subscribe(players => {
      this.players = players;
    })
  }
}
