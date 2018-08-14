import { Component,OnInit } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'next-player',
  templateUrl: 'next-player.html'
})
export class NextPlayerPage implements OnInit{

  public team: string;
  
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    this.team = navParams.get('team')
  }

  ngOnInit(){
  }

  dismiss() {
    // let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss();
  }
  
}
