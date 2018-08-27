import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { GamePage } from "../game/game";

@Component({
  selector: "page-theme",
  templateUrl: "theme.html",
})
export class ThemePage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  public ngOnInit() {
    // To init
  }

  public startGame(theme) {
    this.navCtrl.push(GamePage, {
      teams: this.navParams.get("teams"),
      theme,
      type: this.navParams.get("type"),
    });
  }

  public back() {
    this.navCtrl.pop();
  }

}
