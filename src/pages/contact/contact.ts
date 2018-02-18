import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
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
  latLng;
  marker;

  constructor(public http: Http, public navCtrl: NavController,public localNotifications: LocalNotifications, public geolocation: Geolocation,public backgroundMode: BackgroundMode, public platform: Platform) {

    platform.ready().then(() => {
      console.log('maps');
      this.backgroundMode.on('activate').subscribe(() => {
        console.log('activated');
        if(this.notificationAlreadyReceived === false) {
          this.showNotification();
        }
      });
      
      this.backgroundMode.enable();
    })
  }
  ionViewDidLoad(){
    this.loadMap();
    this.getMarkers();
    this.showMyLocation();


  }

  getMarkers() {
    this.http.get('assets/data/markers.json')
    .map((res) => res.json())
    .subscribe(data => {
      this.addMarkersToMap(data);
    });
  }

  addMarkersToMap(markers) {
    for(let marker of markers) {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var soccerFieldMarker = new google.maps.Marker({position: position, title: marker.title});
      soccerFieldMarker.setMap(this.map);
    }
  }

  showNotification () {
    this.localNotifications.schedule({
      text: 'There is a Soccerfield near you'
    });

    this.notificationAlreadyReceived = true;
  }
 
  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        disableDefaultUI: true,
        zoom: 15,
        
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
 
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }




  showMyLocation() {
    this.geolocation.watchPosition().subscribe((position) => {

       this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
       this.marker = new google.maps.Marker({
        map: this.map,
        icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
        new google.maps.Size(22, 22),
        new google.maps.Point(0, 18),
        new google.maps.Point(11, 11)),
        position: this.latLng,
      });

     
    
      let content = "<h4>You are here</h4>";
      this.addInfoWindow(this.marker, content);

    }, (err) => {
      console.log(err);
    });
  }
  

  

}
