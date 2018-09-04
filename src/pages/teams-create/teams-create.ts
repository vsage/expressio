import { Component, OnInit } from "@angular/core";
import { ModalController, NavController, NavParams } from "ionic-angular";
import { ThemePage } from "../theme/theme";

@Component({
  selector: "teams-create",
  templateUrl: "teams-create.html",
})
export class TeamsCreatePage implements OnInit {

  public inputsList: any[];
  public currentIndex = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
  ) {

  }

  public ngOnInit() {
    this.inputsList = ["équipe 1", "équipe 2"];
  }

  public back() {
    this.navCtrl.pop();
  }

  public createTeam() {
    this.currentIndex += 1;
    this.inputsList.push("équipe " + (this.currentIndex + 1));
  }

  public removeTeam() {
    if (this.inputsList.length > 1) {
      this.currentIndex -= 1;
      this.inputsList.pop();
    }
  }

  public trackByIndex(index: number, obj: any): any {
    return index;
  }

  public goToThemes() {
    this.navCtrl.push(ThemePage, {
      type: this.navParams.get("type"),
      teams: this.inputsList,
    });
  }

}
