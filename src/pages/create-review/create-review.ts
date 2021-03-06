import { Component } from '@angular/core';
import { NavController,Events,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ReviewPage } from '../review/review';

/**
 * Generated class for the CreateReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-review',
  templateUrl: 'create-review.html',
})
export class CreateReviewPage {
  review = {
    speed: 0,
    passing: 0,
    shooting:0,
    teamwork:0,
    defence:0,
    stamina:0,
    keeper:0,
    overall:0,
    player_id: 0,
    reviewer_id: 0
  }

  players:any[] = [];

  constructor(public alertCtrl: AlertController, public events: Events, public navCtrl: NavController, public restProvider: RestProvider) {
   this.getPlayers();
  }

  ngOnInit() {
    this.players = [];
    this.getPlayers();

  }

  // create a new review for a player
  saveReview(){
    console.log("save Review");
    this.restProvider.addReview(this.review).then((result) => {
      console.log(result);
      this.events.publish('players:refresh');
      this.navCtrl.setRoot(ReviewPage);
    }, (err) => {
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Duplicate entry',
        subTitle: 'You already reviewed this player',
        buttons: ['OK']
      });
      alert.present();
    });
  }

// get all players for dropdownlist
  getPlayers() {
    this.restProvider.getPlayers().subscribe(players => {
      this.players = players;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateReviewPage');
  }

}
