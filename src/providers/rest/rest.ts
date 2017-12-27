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

  apiUrl = 'http://95.85.39.197/api/v1'

  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  getPlayers() {
    return this.http.get(this.apiUrl+'/players')
    .map(res => res.json());
  }

  addReview(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/review', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


}
