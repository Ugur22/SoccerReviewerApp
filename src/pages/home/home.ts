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
    this.players = [
      {name:"ugur",speed:89,passing:60,shooting:70,teamwork:76,defence:98,stamina:60,keeper:50,total:70,powerboost:"hello world",special:"sliding"},
      {name:"arthur",speed:89,passing:60,shooting:70,teamwork:76,defence:98,stamina:60,keeper:50,total:70,powerboost:"hello world",special:"sliding"},
      {name:"Robert",speed:89,passing:60,shooting:70,teamwork:76,defence:98,stamina:60,keeper:50,total:70,powerboost:"hello world",special:"sliding"},
      {name:"Jaap", speed:89,passing:60,shooting:70,teamwork:76,defence:98,stamina:60,keeper:50,total:70,powerboost:"hello world",special:"sliding"},
      {name:"Lars", speed:89,passing:60,shooting:70,teamwork:76,defence:98,stamina:60,keeper:50,total:70,powerboost:"hello world",special:"sliding"}
    ]
  }

  ngOnInit() {
    // this.players = [];
    this.getPlayers();

  }


  getPlayers() {
    // this.restProvider.getPlayers().subscribe(players => {
    //   this.players = players;
    // })
    return this.players;
  }
}
