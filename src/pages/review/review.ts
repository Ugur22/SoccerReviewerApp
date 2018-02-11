import { Component } from '@angular/core';
import { NavController,Events } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../home/home';
import {CreateReviewPage} from '../create-review/create-review';

@Component({
  selector: 'page-review',
  providers:[RestProvider],
  templateUrl: 'review.html'
})
export class ReviewPage {
createReview = CreateReviewPage;

reviews:any[] = [];

  constructor(public events: Events, public navCtrl: NavController, public restProvider: RestProvider) {

  }

  ngOnInit() {
    this.reviews = [];
    this.getReviews();

  }


  getReviews(){
    this.restProvider.getReviews().subscribe(reviews => {
      this.reviews = reviews;
      console.log(reviews);
    })
  }
}
