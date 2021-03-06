import { Component } from '@angular/core';
import { NavController,Events } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
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


  // Get all reviews
  getReviews(){
    this.restProvider.getReviews().subscribe(reviews => {
      this.reviews = reviews;
      console.log(reviews);
    })
  }

  // delete a slected review
  deleteReview(review){
    var reviews = this.reviews;
   
    this.restProvider.deleteReview(review.id)
      .subscribe(success => {
        for (var i = 0; i < reviews.length; i++) {
          if (reviews[i]._id == review.id) {
            reviews.splice(i, 1);
     
          
          }
        }
        this.getReviews();
      })
    
  }
}
