// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  {Http, Headers} from '@angular/http';
import  'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()

export class RestProvider {

  apiUrl = 'http://188.166.64.81/api/v1'

  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  getPlayers() {
    return this.http.get(this.apiUrl+'/players')
    .map(res => res.json());
  }

  getReviews() {
    return this.http.get(this.apiUrl+'/review')
    .map(res => res.json());
  }

  addReview(data) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/review', JSON.stringify(data), {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
     
        });
    });
  }


  deleteReview(id) {
    return this.http.delete(this.apiUrl+'/review/'+id)
      .map(res => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        } else {
          res.json();
        }
      });
  }

}
