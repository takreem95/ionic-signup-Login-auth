import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { UserserviceProvider } from '../../providers/userservice/userservice';
import { PhoneVerificationPage } from '../phone-verification/phone-verification';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserserviceProvider]
})
export class LoginPage {

  public email: string;
  public password: string;
  
  constructor(public usersService : UserserviceProvider,public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public altCtrl: AlertController) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.usersService.onAuthState().then(user => {
      console.log(user)
      if(user){
         this.navCtrl.push(HomePage);
      }
    }) 
  }

  submitLogin(){
    var that = this;
    
    var loader = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Please Wait..'
        });
        loader.present();
    
    
        this.usersService.loginUserService(this.email, this.password).then(authData => {
          //successful
          loader.dismiss();
          that.navCtrl.setRoot(HomePage);
    
        }, error => {
    loader.dismiss();  
         // Unable to log in
          let toast = this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: 'top'
          });
          toast.present();
    
    that.password = ""//empty the password field
    
        });
    
  }

  forgotPassword(){
    let prompt = this.altCtrl.create({
      title: 'Enter your email',
      message: 'A new passwod will be sent to you',
      inputs: [
        {
          name: 'recoverEmail',
          placeholder: 'you@example.com'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
              let loading = this.loadingCtrl.create({
                dismissOnPageChange: true,
                content: 'Reseting your password..'
              });
               

            this.usersService.resetPassword(data.recoverEmail).then(() => {
                    loading.dismiss().then(() => {
                      let alert = this.altCtrl.create({
                        title: 'Check your Email',
                        subTitle: 'Password reset successful',
                        buttons: ['OK']
                      });
                      alert.present();
                    })
            }, error => {
              loading.dismiss().then(() => {
               let alert = this.altCtrl.create({
                 title: 'Error resetting password',
                 subTitle: error.message,
                 buttons: ['OK']
               });
               alert.present();
              })
            });
            
          }
          }
      ]
    });
    prompt.present();
  }

  redirectToSignup(){

    this.navCtrl.push(SignupPage);

}

redirectToPhoneVerification(){
  this.navCtrl.push(PhoneVerificationPage);
}

}
