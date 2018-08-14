import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TeamsCreatePage } from '../teams-create/teams-create';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  teamsCreatePage: any;

  constructor(public navCtrl: NavController) {
    this.teamsCreatePage = TeamsCreatePage;
  }

  // startFreeGame(){
  //   this.navCtrl.push(ThemesPage);
  // }
}
