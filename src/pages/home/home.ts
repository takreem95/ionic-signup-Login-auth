import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserserviceProvider } from '../../providers/userservice/userservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public usersService : UserserviceProvider) {

  }
  ionViewDidLoad(){
   this.usersService.onAuthState().then(user => {
     console.log(user)
     if(!user){
        this.navCtrl.push(LoginPage);
     }
   }) 
  }
  redirectToLogout(){
        this.usersService.logutUserService();
        
    
}

}
