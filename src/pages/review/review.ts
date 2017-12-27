import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-review',
  providers:[RestProvider],
  templateUrl: 'review.html'
})
export class ReviewPage {

review = {
  speed: 20,
  passing: 0,
  shooting: 0,
  teamwork:0,
  defence:0,
  stamina:0,
  overall:0,
  player_id: '',
  reviewer_id: '',
  playerdef:'test'
}

players:any[] = [];

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
   this.getPlayers();
  }

  ngOnInit() {
    this.players = [];
    this.getPlayers();

  }

  saveReview(){

  }



  getPlayers() {
    this.restProvider.getPlayers().subscribe(players => {
      this.players = players;
    })
  }

}
