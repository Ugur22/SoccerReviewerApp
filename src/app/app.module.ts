import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ReviewPage } from '../pages/review/review';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import {CreateReviewPage} from '../pages/create-review/create-review';
import { TabsPage } from '../pages/tabs/tabs';
import { Geolocation } from '@ionic-native/geolocation';
import {HttpModule} from '@angular/http';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';


@NgModule({
  declarations: [
    MyApp,
    ReviewPage,
    ContactPage,
    HomePage,
    TabsPage,
    CreateReviewPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ReviewPage,
    ContactPage,
    HomePage,
    TabsPage,
    CreateReviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    LocalNotifications,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
  ]
})
export class AppModule {}
