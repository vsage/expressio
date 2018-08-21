import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TeamsCreatePage } from '../teams-create/teams-create';
import { ThemesPage } from '../themes/themes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  teamsCreatePage: any;
  themesPage: any;

  constructor(
    public navCtrl: NavController) {
    this.teamsCreatePage = TeamsCreatePage;
    this.themesPage = ThemesPage;

    // i9BuHwE9EmJpWgmh
  }

}
