import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/observable/interval";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/skip";
import { LocalNotifications } from '@ionic-native/local-notifications';

declare var google;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  notificationAlreadyReceived = false;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  options: GeolocationOptions;
  currentPos: Geoposition;
  latLng;
  marker;
  subscription;
  totalMarkers;
  places: Array<any>;


  constructor(public http: Http, public navCtrl: NavController, public localNotifications: LocalNotifications, public geolocation: Geolocation, public backgroundMode: BackgroundMode, public platform: Platform) {
    this.getUserPosition();

    platform.ready().then(() => {
      console.log('maps');
      // Initializing backgroundmode
      this.backgroundMode.on('activate').subscribe(() => {
        console.log('activated');
        // show number of stadiums thorugh background notification after 4 second when app in background
        this.subscription = Observable.interval(4000).subscribe(x => {
          if (this.totalMarkers > 0) {
            if (this.notificationAlreadyReceived === false) {
             this.showNotification();
            }
          }
        });
      });

      this.backgroundMode.enable();
    })
  }

  // Create markers for all places found within radius 
  createMarker(place) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
    });

  }

  // query to display stadiums within a certain range of the users location
  getStadiums(latLng) {
    var service = new google.maps.places.PlacesService(this.map);
    let request = {
      location: latLng,
      radius: 2000,
      types: ["stadium"]
    };


    return new Promise((resolve, reject) => {
      service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }

      });
    });

  }


  // init Google maps centering on users location
  addMap(lat, long) {

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);



    // Add all found stadiums as markers on Google maps  
    this.getStadiums(latLng).then((results: Array<any>) => {
      this.places = results;
      for (let i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }

      if (results.length > 0) {
        this.totalMarkers = results.length;
       
      }
    }, (status) => console.log(status));



    this.addMarker();

  }

  // Add user location marker
  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon: new google.maps.MarkerImage('https://maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
        new google.maps.Size(22, 22),
        new google.maps.Point(0, 18),
        new google.maps.Point(11, 11)),
      position: this.map.getCenter()
    });



    let content = "<p>You are here!</p>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }


  // background notification 
  showNotification() {
    this.localNotifications.schedule({
      text: 'There are '+ this.totalMarkers + ' soccer stadium near you'
    });

    this.notificationAlreadyReceived = true;
  }

  // get user location and add to Google Maps
  getUserPosition() {
    this.options = {
      enableHighAccuracy: false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {

      this.currentPos = pos;

      console.log(pos);
      this.addMap(pos.coords.latitude, pos.coords.longitude);


    }, (err: PositionError) => {
      console.log("error : " + err.message);
      ;
    })
  }


}
