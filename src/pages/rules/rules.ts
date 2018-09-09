import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController, ViewController } from "ionic-angular";

@Component({
  selector: "rules-page",
  templateUrl: "rules.html",
})
export class RulesPage {

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
  ) {
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
