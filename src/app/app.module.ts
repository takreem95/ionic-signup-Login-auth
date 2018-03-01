import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { UserserviceProvider } from '../providers/userservice/userservice';
import { PhoneVerificationPage } from '../pages/phone-verification/phone-verification';

// Initialize Firebase
export const config = {
  apiKey: "AIzaSyD7u33vVV55DMC20JzKsNgRtWQdGlEsiXc",
  authDomain: "ionicimageupload-11967.firebaseapp.com",
  databaseURL: "https://ionicimageupload-11967.firebaseio.com",
  projectId: "ionicimageupload-11967",
  storageBucket: "ionicimageupload-11967.appspot.com",
  messagingSenderId: "869258585689"
};
firebase.initializeApp(config);


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    PhoneVerificationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    PhoneVerificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserserviceProvider
  ]
})
export class AppModule {}
