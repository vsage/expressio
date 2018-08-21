import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';

@Component({
  selector: 'themes',
  templateUrl: 'themes.html'
})
export class ThemesPage implements OnInit{

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ngOnInit(){
  }

  startGame(theme) {
    this.navCtrl.push(GamePage, {
      type: this.navParams.get('type'),
      theme: theme,
      teams: this.navParams.get('teams')
    })
  }
  
}
