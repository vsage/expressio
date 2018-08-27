import { Component, OnInit } from "@angular/core";
import { ModalController, NavController, NavParams } from "ionic-angular";
import { ThemePage } from "../theme/theme";

@Component({
  selector: "teams-create",
  templateUrl: "teams-create.html",
})
export class TeamsCreatePage implements OnInit {

  public inputsList: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
  ) {

  }

  public ngOnInit() {
    this.inputsList = ["", ""];
  }

  public createTeam() {
    this.inputsList.push("");
    // let nameTeam = this.modalCtrl.create(NameTeamPage);
    // nameTeam.onDidDismiss(data => {
    //   console.log(data);
    // });
    // nameTeam.present();
  }

  public removeTeam() {
    if (this.inputsList.length > 2) {
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
