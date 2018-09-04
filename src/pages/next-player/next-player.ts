import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";

@Component({
  selector: "next-player-page",
  templateUrl: "next-player.html",
})
export class NextPlayerPage {

  public team: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    this.team = navParams.get("team");
  }

  // public ngOnInit() {
  // }

  public dismiss() {
    // let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss();
  }

}
