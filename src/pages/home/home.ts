import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { TeamsCreatePage } from "../teams-create/teams-create";
import { ThemePage } from "../theme/theme";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {

  public teamsCreatePage: any;
  public themePage: any;

  constructor(
    public navCtrl: NavController) {
    this.teamsCreatePage = TeamsCreatePage;
    this.themePage = ThemePage;

  }

}
